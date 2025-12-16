import { computed, inject, Injectable, NgZone, Renderer2, RendererFactory2 } from '@angular/core';
import { Feature, Map, MapBrowserEvent, View } from 'ol';
import { defaults as defaultInteractions, Draw, PinchZoom } from 'ol/interaction';
import { defaults as defaultControls, ScaleLine } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import LayerGroup from 'ol/layer/Group';
import ImageLayer from 'ol/layer/Image';
import { TileWMS, ImageWMS, OSM } from 'ol/source';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import VectorLayer from 'ol/layer/Vector';
import { MenuOnClickComponent } from '../components/shared/on-click-component/menu-on-click-component/menu-on-click-component';
import { OnClickComponent } from '../components/shared/on-click-component/on-click-component';
import { Subscription, take } from 'rxjs';
import { LayersService, mappingResultObject } from './layers-service';
import { SelectInfoModalService } from './select-info-modal-service';
import { Polygon, MultiPolygon, LineString, MultiLineString } from 'ol/geom';
import { unByKey } from 'ol/Observable';
import { EventsKey } from 'ol/events';
import { FormGroup } from '@angular/forms';
import { BottomSheetService } from './bottom-sheet-service';
import { ResponsiveService } from './responsive-service';
import { ExemplarInfoComponent } from '../components/shared/exemplar-info-component/exemplar-info-component';
import { exemplarMock } from '../components/shared/exemplar-info-component/data-mock';

export interface dataToDialogInfoSearch {
  data: mappingResultObject,
  zoomToFeature: boolean,
  typeOfDialog: 'info' | 'search' | 'edit' | 'filter'
}

export interface objGeneralToSpecific {
  layerSource: string,
  dataOrForm: { [key: string]: string } | FormGroup<any>,
  telasGsu?: { [key: string]: number },
  formatedKeys: {},
  typeMode: dataToDialogInfoSearch['typeOfDialog'],
  dataFull: dataToDialogInfoSearch
}

@Injectable({
  providedIn: 'root',
})
export class MapService {

  private responsive = inject(ResponsiveService);
  isMobile = computed(() => this.responsive.isSmallScreen());

  public map!: Map;
  public mapIsRedering: boolean = true;
  selectedTileSource: TileLayer<any> = new TileLayer();
  tileLayer: TileLayer<any> = new TileLayer()


  private renderer: Renderer2;
  onClickComponent?: MatDialogRef<OnClickComponent>;
  menuOnClickDialog?: MatDialogRef<MenuOnClickComponent>;
  generalInfoDialog?: MatDialogRef<any>;
  mainInfoFeaturesFunctionSubscrition?: EventsKey | EventsKey[];

  constructor(private ngZone: NgZone,

    private dialog: MatDialog,
    private selecModal: SelectInfoModalService,
    private layersService: LayersService,
    private rendererFactory: RendererFactory2,

    private sheet: BottomSheetService
  ) {

    this.selectedTileSource = this.layersService.tileSources[1]
    this.renderer = this.rendererFactory.createRenderer(null, null);

    this.ngZone.runOutsideAngular(() =>
      this.map = new Map({
        moveTolerance: 3,
        interactions: defaultInteractions().extend([
          new PinchZoom()
        ]),
        layers: [this.tileLayer],
        view: new View({
          projection: 'EPSG:4326',
          center: [-46.9212, -23.448],
          zoom: 18,
          // extent: [-47.054, -23.549, -46.782, -23.344]
        }),
        controls: defaultControls({ attribution: false, zoom: false, rotate: false }).extend([
          // new ScaleLine({
          //   units: 'metric',
          //   bar: true
          // })
        ]),
      })
    );
    this.map.addLayer(this.layersService.fasesLayer);
    this.map.addLayer(this.layersService.arvoresLayer);

    this.map.on('loadstart', () => {
      this.mapIsRedering = true;
    });

    this.map.on('loadend', () => {
      this.mapIsRedering = false;
    });

    this.setMainInfoFeaturesFunction();
  }


  updateView(zoom = 14, center: [number, number] = [-47.5620, -23.3574]): void {
    this.map.getView().setZoom(zoom);
    this.map.getView().setCenter(fromLonLat(center, 'EPSG:4326'));
  }

  setTarget(target: string | HTMLElement | undefined): void {
    this.map.setTarget(target);
  }

  updateSize(): void {
    this.map.updateSize();
  }

  detach() {
    this.map.setTarget(undefined);
  }

  attach(target: string | HTMLElement) {
    this.map.setTarget(target);
    this.map.updateSize();
  }

  setTileSource(source: TileLayer<any> = this.selectedTileSource): void {
    this.selectedTileSource = source;
    this.tileLayer.setSource(source.getSource());
  }

  setMainInfoFeaturesFunction() {
    this.leaveMainInfoFeaturesFunction();
    // this.mainInfoFeaturesPointFunctionSubscrition = this.map.on('pointermove', this.changeCursor);
    this.mainInfoFeaturesFunctionSubscrition = this.mainInfoFeaturesFunction();
  };

  leaveMainInfoFeaturesFunction() {
    unByKey(this.mainInfoFeaturesFunctionSubscrition!);
    // unByKey(this.mainInfoFeaturesPointFunctionSubscrition);
  };


  mainInfoFeaturesFunction() {

    var evtKey = this.map.on('click', (evt) => {
      let listFeature: Feature[] = [];
      // console.log('Para cada feição no clique:');
      this.map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
        console.log('feature: ', feature);
        console.log('layer: ', layer);
        if (typeof layer.get('id') === 'string') {
          if (['HLO', 'HLI'].some((e) => layer.get('id').includes(e))) return;
        }
        if (layer.get('id') != 2) return
        listFeature.push(feature as Feature);
      });
      // console.log(listFeature);
      const evtPixelGlobal = [(evt as MapBrowserEvent<PointerEvent>).originalEvent.pageX, (evt as MapBrowserEvent<PointerEvent>).originalEvent.pageY];
      this.openOnClickComponent(listFeature, evtPixelGlobal);
    });
    return evtKey;
  };

  // Abrir diálogo de escolha caso o click contenha mais de uma camada e/ou feição
  openOnClickComponent(e: {}, position: number[]): void {
    const positioning = { left: (position[0] + 10).toString() + 'px', top: (position[1] + 10).toString() + 'px' };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 0;
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = false;
    dialogConfig.position = positioning;
    dialogConfig.data = {
      mappedMenu: e,
      left: position[0],
      top: position[1]
    };

    if (this.onClickComponent instanceof MatDialogRef) this.onClickComponent.close();
    this.onClickComponent = this.dialog.open(OnClickComponent, dialogConfig);
  };

  closeOnClickComponent() {
    this.onClickComponent?.close();
  }

  openMenuOnClickComponent(dialogConfig: MatDialogConfig<any>) {
    if (this.menuOnClickDialog instanceof MatDialogRef) this.menuOnClickDialog.close();
    this.menuOnClickDialog = this.dialog.open(MenuOnClickComponent, dialogConfig);
  }


  findLayerOfFeature(targetFeature: Feature): VectorLayer<any> | undefined {
    for (const layer of this.map.getLayers().getArray()) {
      if (layer instanceof VectorLayer) {
        const source = layer.getSource();
        if (source && source.getFeatures().includes(targetFeature)) {
          return layer; // agora funciona
        }
      }
    }

    return undefined;
  }



  openGeneralFeatureInfo(item: mappingResultObject, zoomToFeature: boolean = false, typeOfDialog = 'info', panelClass: string[] = []) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = false;

    dialogConfig.panelClass = panelClass
    if (!this.isMobile()) {
      dialogConfig.panelClass.push('box-resizeble-container');
      dialogConfig.panelClass.push('isfeModal');
      dialogConfig.position = { top: this.dialogPositionGeneralInfo.top + 'px', left: this.dialogPositionGeneralInfo.left + 'px' };
    }
    else {
      dialogConfig.width = '100vw'
      dialogConfig.height = '100%'
      dialogConfig.position = { top: '0px', left: '0px' };
    }

    dialogConfig.data = { 'data': item, 'zoomToFeature': zoomToFeature, 'typeOfDialog': typeOfDialog } as dataToDialogInfoSearch;
    dialogConfig.enterAnimationDuration = 0;

    if (this.generalInfoDialog instanceof MatDialogRef
      // Depois definir aqui o que irá definir se pode ou não abrir mais de um modal simutaneamente.
      // &&  !this.setApplication.value.multipleISFEModal
    ) {
      this.setCloseLayersModals(typeOfDialog as 'info' | 'search' | 'filter' | 'edit', item.layerId, item.pk_value?.toString())
      this.generalInfoDialog.close();
    }

    const modal = this.selecModal.getComponent(Number(item.layerId));
    var modalId = this.modalAlreadyOpended(typeOfDialog as 'info' | 'search' | 'filter' | 'edit', item.layerId, item.pk_value?.toString());
    if (!modalId) {
      // console.log('modal ainda não aberto')
      setTimeout(() => {

        this.generalInfoDialog = this.dialog.open(ExemplarInfoComponent, {
          data: exemplarMock,
          maxWidth: '480px', // simula celular
          panelClass: 'mobile-dialog'
        });

        // this.generalInfoDialog = this.dialog.open(modal, dialogConfig);

        this.setOpenLayersModals(typeOfDialog as 'info' | 'search' | 'filter' | 'edit', item.layerId, this.generalInfoDialog.id, item.pk_value?.toString(), item.geomFeature);

        this.generalInfoDialog.afterOpened().pipe(take(1)).subscribe(_ => {
          var modalElem = this.getOpenedModalId(this.generalInfoDialog?.id!)
          if (modalElem) {
            this.modalToTop(modalElem)
          }
          else {
          }
        })

      }, 100);
    }
    else {
      // console.log('modal já aberto')
      var modalElem = this.getOpenedModalId(modalId as string)
      setTimeout(() => {
        if (modalElem) {
          this.triggerShake_beta(modalElem)
          this.modalToTop(modalElem)
        }
      }, 100)
      // if (modalElem) {
      //   console.log('c', modalElem)
      //   this.modalToTop(modalElem)
      // }
    }
  };

  openedLayersModalsControl: {
    info: { [key: string]: { idFeature: string, geomFeature: Feature, idModal: string }[] },
    search: { [key: string]: { idModal: string } },
    filter: { [key: string]: { idModal: string } },
    edit: { [key: string]: { idFeature: string, geomFeature: Feature, idModal: string }[] }
  } = { info: {}, search: {}, filter: {}, edit: {} }

  setOpenLayersModals(mode: 'info' | 'search' | 'filter' | 'edit', layerId: string, modal: string, featureId?: string, featureGeom?: Feature) {
    if (mode == 'info' || mode == 'edit') {
      if (Object.keys(this.openedLayersModalsControl[mode]).includes(layerId.toString())) {
        this.openedLayersModalsControl[mode][layerId].push({ idFeature: featureId!, geomFeature: featureGeom!, idModal: modal })
      }
      else {
        this.openedLayersModalsControl[mode][layerId] = [{ idFeature: featureId!, geomFeature: featureGeom!, idModal: modal }];
      }
    }
    else {
      this.openedLayersModalsControl[mode][layerId] = { idModal: modal };
    }
    // console.log(this.openedLayersModalsControl);
  }

  setCloseLayersModals(mode: 'info' | 'search' | 'filter' | 'edit', layerId: string, featureId?: string) {
    if (mode == 'info' || mode == 'edit') {
      if (Object.keys(this.openedLayersModalsControl[mode]).includes(layerId.toString())) {
        // var index = Object.keys(this.openedLayersModalsControl.info['layerId']).findIndex(obj => obj['feature'] == layerId);
        this.openedLayersModalsControl[mode][layerId] = this.openedLayersModalsControl[mode][layerId].filter(e => e.idFeature != featureId);
        if (this.openedLayersModalsControl[mode][layerId].length == 0) {
          delete this.openedLayersModalsControl[mode][layerId];
        }
      }
      else {
        // console.log('Atenção aqui!')
      }
    }
    else {
      delete this.openedLayersModalsControl[mode][layerId];

    }
    // console.log(this.openedLayersModalsControl);
  }

  modalAlreadyOpended(mode: 'info' | 'search' | 'filter' | 'edit', layerId: string, feature: string): string | false {
    // console.log('openedLayersModalsControl', this.openedLayersModalsControl);
    try {
      var modeOfObject: { idFeature: string, geomFeature: Feature, idModal: string }[] | { idModal: string } = this.openedLayersModalsControl[mode][layerId]
    } catch (error) {
      return false;
    }

    // var modeOfObject: {idFeature: string, geomFeature: Feature, idModal: string}[] | string = this.openedLayersModalsControl[mode][layerId]
    if (!modeOfObject) {
      return false
    }
    else {
      if (!Array.isArray(modeOfObject)) {
        return modeOfObject.idModal
      }
      else if (Array.isArray(modeOfObject)) {
        var elem = modeOfObject.filter(e => e.idFeature == feature)[0]
        if (elem) {
          return elem.idModal
        }
        else {
          return false;
        }
      }
      else {
        console.log('Atenção aqui!')
        return false
      }
    }
  }

  getOpenedModalId(modalId: string): Element | false {
    const elements = document.getElementsByClassName(
      'cdk-global-overlay-wrapper'
    );
    var elem: Element;
    for (let i = 0; i < elements.length; ++i) {
      const el = elements[i];
      el.children
      const children = el.children.item(0)?.children;
      var array = Array.from(children!);
      elem = array.filter(e => e.id == modalId)[0];
      if (elem) return elem;
    }

    return false;

  }

  modalToTop(wich: Element) {
    const elements = Array.from(document.getElementsByClassName('cdk-global-overlay-wrapper'));
    // var filter = elements.slice();
    var filter = elements.filter(e => Array.from(e.children).some(z => Array.from(z.classList).includes('isfeModal')));
    this.clearHighligthAllFeature('higthlihtInfo');

    for (let i = 0; i < filter.length; ++i) {
      const el = filter[i];
      var headerOthers = el.getElementsByClassName('modal-header')[0]
      this.renderer.removeClass(headerOthers, 'modal-header-focus');

      if (el.contains(wich)) {
        var headerWich = wich.getElementsByClassName('modal-header')[0]
        this.renderer.addClass(headerWich, 'modal-header-focus')

        this.highligthFeatureFromModal(el.children[0].children[1].id);

        const parent = el.parentNode;
        const last = parent?.lastChild;
        if (last != el) {
          last?.parentNode?.insertBefore(el, last.nextSibling);
        }
      }
    }
  }

  chooseGeomToHighlight(feature: Feature, highlightObject: { polygon: VectorLayer<any>, line: VectorLayer<any>, point: VectorLayer<any> }) {

    if (feature.getGeometry() instanceof Polygon || feature.getGeometry() instanceof MultiPolygon) return highlightObject['polygon'];
    else if (feature.getGeometry() instanceof LineString || feature.getGeometry() instanceof MultiLineString) return highlightObject['line']
    else return highlightObject['point']
  };

  highligthFeature(feature: Feature, highlightObject: string) {
    // this.clearHighligthAllFeature(highlightObject);
    // var layer = this.chooseGeomToHighlight(feature, this.layersService[highlightObject]);
    // this.map.getLayers().insertAt(0, layer)
    // layer.getSource().addFeature(feature);
  }

  clearHighligthFeature(feature: Feature, highlightObject: string) {
    // var layer = this.chooseGeomToHighlight(feature, this.layersService[highlightObject]);
    // layer.getSource().clear();
    // this.map.removeLayer(layer);
  }

  clearHighligthAllFeature(highlightObject: string) {
    // Object.keys(this.layersService[highlightObject]).forEach((e) => {
    //   if (this.map.getAllLayers().includes(this.layersService[highlightObject][e])) {
    //     this.layersService[highlightObject][e].getSource().clear();
    //     this.map.removeLayer(this.layersService[highlightObject][e]);
    //   };
    // });
  };




  highligthFeatureFromModal(modalId: string) {
    var featureGeom: Feature
    for (let i of Object.keys(this.openedLayersModalsControl.info)) {
      var item = this.openedLayersModalsControl.info[i].filter(e => e.idModal == modalId);
      if (item.length > 0) {
        var featureGeom: Feature = item[0].geomFeature;
        this.highligthFeature(featureGeom, 'higthlihtInfo')
        break
      }
    }
    for (let i of Object.keys(this.openedLayersModalsControl.edit)) {
      var item = this.openedLayersModalsControl.edit[i].filter(e => e.idModal == modalId);
      if (item.length > 0) {
        var featureGeom: Feature = item[0].geomFeature;
        this.highligthFeature(featureGeom, 'higthlihtInfo')
        break
      }
    }
  }

  triggerShake_beta(elem: Element) {
    this.renderer.addClass(elem, 'shake')
    setTimeout(() => {
      this.renderer.removeClass(elem, 'shake');
    }, 300);
  }

  dialogPositionGeneralInfo: { top: number, left: number } = { top: 70, left: 200 }
  updatePositionModal(data: { top: number, left: number }, values: { top: number, left: number }) {
    data.top = values.top;
    data.left = values.left;
    if (window.innerWidth - data.left < 450) {
      data.left = window.innerWidth - 450
    }
    if (window.innerHeight - data.top < 100) {
      data.top = window.innerHeight - 100
    }
    if (data.top < 0) {
      data.top = 20
    }
    if (data.left < 0) {
      data.left = 20
    }
  }


  changeTileSource(source: 'satelite' | 'mapa'): void {
    if (source == 'mapa') {
      this.selectedTileSource = this.layersService.tileSources[0];
      this.tileLayer.setSource(this.layersService.tileSources[0].getSource());
    }
    else {
      this.selectedTileSource = this.layersService.tileSources[1];
      this.tileLayer.setSource(this.layersService.tileSources[1].getSource());
    }

  }
}

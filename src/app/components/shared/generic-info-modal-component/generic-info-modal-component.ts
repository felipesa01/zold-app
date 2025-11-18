import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Feature } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { lastValueFrom } from 'rxjs';
import { mappingResultObject } from '../../../services/layers-service';
import { dataToDialogInfoSearch, MapService, objGeneralToSpecific } from '../../../services/map-service';
import { NgIf } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';


export const types = {
  igual: {
    value: 1,
    text: 'Igual a (=)',
    cqlfilter: `strStripAccents(strToLowerCase("/attr/"))='/value1/'`
  },
  diferente: {
    value: 2,
    text: 'Diferente de (≠)',
    cqlfilter: `strStripAccents(strToLowerCase("/attr/"))<>'/value1/'`
  },
  contem: {
    value: 3,
    text: 'Contém',
    cqlfilter: `isLike(strStripAccents(strToLowerCase("/attr/")), '^.*/value1/.*$')=true`
  },
  naoContem: {
    value: 4,
    text: 'Não contém',
    cqlfilter: `strStripAccents(strToLowerCase("/attr/"))NOT LIKE'%/value1/%'`
  },
  nulo: {
    value: 5,
    text: 'É nulo',
    cqlfilter: `strStripAccents(strToLowerCase("/attr/"))IS NULL`
  },
  naoNulo: {
    value: 6,
    text: 'Não é nulo',
    cqlfilter: `strStripAccents(strToLowerCase("/attr/"))IS NOT NULL`
  },
  inicia: {
    value: 7,
    text: 'Inicia com',
    cqlfilter: `strStripAccents(strToLowerCase("/attr/"))LIKE'/value1/%'`
  },
  finaliza: {
    value: 8,
    text: 'Finaliza com',
    cqlfilter: `strStripAccents(strToLowerCase("/attr/"))LIKE'%/value1/'`
  },
  maior: {
    value: 9,
    text: 'Maior que',
    cqlfilter: `strStripAccents(strToLowerCase("/attr/"))>'/value1/'`
  },
  menor: {
    value: 10,
    text: 'Menor que',
    cqlfilter: `strStripAccents(strToLowerCase("/attr/"))<'/value1/'`
  },
  maiorIgual: {
    value: 11,
    text: 'Maior ou igual a',
    cqlfilter: `strStripAccents(strToLowerCase("/attr/"))>='/value1/'`
  },
  menorIgual: {
    value: 12,
    text: 'Menor ou igual a',
    cqlfilter: `strStripAccents(strToLowerCase("/attr/"))<='/value1/'`
  },
  entre: {
    value: 13,
    text: 'Entre',
    cqlfilter: `"/attr/">='/value1/'AND"/attr/"<='/value2/'`
  },
  naoEntre: {
    value: 14,
    text: 'Não está entre',
    cqlfilter: `"/attr/"<'/value1/'AND"/attr/">'/value2/'`
  },
  antes: {
    value: 15,
    text: 'Antes de',
    cqlfilter: `"/attr/"<dateParse('yyyy-MM-dd','/value1/')`
  },
  depois: {
    value: 16,
    text: 'Depois de',
    cqlfilter: `"/attr/">dateParse('yyyy-MM-dd','/value1/')`
  },
  antesDurante: {
    value: 17,
    text: 'Antes (incluso) de',
    cqlfilter: `"/attr/"<=dateParse('yyyy-MM-dd','/value1/')`
  },
  depoisDurante: {
    value: 18,
    text: 'Depois (incluso) de',
    cqlfilter: `"/attr/">=dateParse('yyyy-MM-dd','/value1/')`
  },
  igualData: {
    value: 19,
    text: 'Igual a',
    cqlfilter: `"/attr/"=dateParse('yyyy-MM-dd','/value1/')`
  },
  diferenteData: {
    value: 20,
    text: 'Diferente de',
    cqlfilter: `"/attr/" < dateParse('yyyy-MM-dd','/value1/')AND"/attr/" > dateParse('yyyy-MM-dd','/value1/')`
  },
  entreData: {
    value: 21,
    text: 'Entre',
    cqlfilter: `"/attr/" >= dateParse('yyyy-MM-dd','/value1/')AND"/attr/" <= dateParse('yyyy-MM-dd','/value2/')`
  },
  naoEntreData: {
    value: 22,
    text: 'Não está entre',
    cqlfilter: `"/attr/" < dateParse('yyyy-MM-dd','/value1/')OR"/attr/" > dateParse('yyyy-MM-dd','/value2/')`
  },
}
export const typeMapper = {
  number: {
    type: 'text',
    options: [types.igual, types.diferente, types.maior, types.menor, types.maiorIgual, types.menorIgual, types.entre, types.naoEntre],
    default: types.igual.value
  },
  int: {
    type: 'text',
    options: [types.igual, types.diferente, types.maior, types.menor, types.maiorIgual, types.menorIgual, types.entre, types.naoEntre],
    default: types.igual.value
  },
  string: {
    type: 'text',
    options: [types.igual, types.diferente, types.contem, types.naoContem, types.inicia, types.finaliza, types.nulo, types.naoNulo],
    default: types.contem.value
  },
  boolean: {
    type: 'checkbox',
    options: [types.igual],
    default: types.igual.value
  },
  date: {
    type: 'date',
    options: [types.igualData, types.diferenteData, types.depois, types.antes, types.entreData, types.naoEntreData, types.nulo, types.naoNulo],
    default: types.igualData.value
  }
}


@Component({
  selector: 'app-generic-info-modal-component',
  imports: [DragDropModule],
  templateUrl: './generic-info-modal-component.html',
  styleUrl: './generic-info-modal-component.css',
})


export class GenericInfoModalComponent implements OnDestroy, OnDestroy, AfterViewInit {

  @Output() outputData = new EventEmitter<objGeneralToSpecific>();
  @Input() showAttributes: boolean = true;
  // @ViewChild(ToastContainerDirective)
  // toastContainer: ToastContainerDirective;
  keys: string[];
  // keysMapsw: object;
  formatedKeys: { [key: string]: string };
  geomIsPoint: boolean = false;
  layerSource?: string;

  isLoading: boolean = true;
  mainData: { [key: string]: any };
  telasGsu = {};

  dataFull?: {};

  searchIsLoading = false;

  editable = false;

  // SEARCH MODE
  profileForm?: FormGroup;
  types = types;
  typeMapper = typeMapper;


  layer: VectorLayer<any>;

  temQuadras: boolean = false;


  constructor(
    public mapService: MapService,
    @Inject(MatDialogRef) private dialogRef: MatDialogRef<GenericInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataObj: dataToDialogInfoSearch,
    private _elementRef: ElementRef) {

    this.layer = this.mapService.map.getAllLayers().filter(layer => layer.get('id') === this.dataObj.data.layerId)[0] as VectorLayer<any>;
    let feature = this.layer?.getSource()?.getFeatures().filter((f: Feature<any>) => f.get(this.layer.get('pk_name')) == this.dataObj.data.pk_value)[0];

    this.mainData = feature.getProperties();
    this.keys = Object.keys(this.mainData).filter(e => e != 'geometry');
    this.formatedKeys = this.keys.reduce<Record<string, string>>((obj, key) => { obj[key] = key; return obj; }, {});

    this.emitData().then(() => {
      // console.log('Emitiu');
      this.finishLoad(this.dataObj.data, dataObj.zoomToFeature);
    });

    // console.log('mainData', this.mainData)
    // console.log('dataObj', this.dataObj)


    this.dialogRef.afterClosed().subscribe(e => {
      this.mapService.setCloseLayersModals(this.dataObj.typeOfDialog as 'info' | 'search' | 'filter', this.dataObj.data.layerId, this.dataObj.data.pk_value?.toString())
    });


  } //END OF CONSTRUCTOR /\

  ngAfterViewInit(): void {
    // this.toastr.overlayContainer = this.toastContainer;
  }

  // COMMOM MODE
  ngOnDestroy(): void {

    if (this.dataObj.typeOfDialog == 'info' || this.dataObj.typeOfDialog == 'edit') {
      this.mapService.clearHighligthFeature(this.dataObj?.data?.geomFeature!, 'higthlihtInfo');
      this.finishLoad();
    }

  }

  updatePositionModal() {
    let element: HTMLElement = this._elementRef.nativeElement;
    let dialog = element?.parentElement?.parentElement?.parentElement?.parentElement;
    let dialogPosition = dialog?.getBoundingClientRect();
    if (dialogPosition) this.mapService.updatePositionModal(this.mapService.dialogPositionGeneralInfo, { top: dialogPosition.top, left: dialogPosition.left });
  }

  // get shakeDialog(): boolean {
  //   var item: boolean;
  //   if (this.dataObj.typeOfDialog == 'info' || this.dataObj.typeOfDialog == 'edit') {
  //     return this.mapService.openedLayersModalsControl[this.dataObj.typeOfDialog][this.dataObj.data.layerId].filter(e => e.idFeature == this.dataObj.data.pk_value.toString())[0].shake
  //   }
  //   else {
  //     return this.mapService.openedLayersModalsControl[this.dataObj.typeOfDialog][this.dataObj.data.layerId].shake;
  //   }
  // }

  close() {
    this.updatePositionModal();
    this.dialogRef.close();
  }

  // ---- INFO MODE ----
  // -------------------
  setExtend() {
    this.mapService.map.getView().fit(this.dataObj?.data?.geomFeature?.getGeometry()?.getExtent()!, { padding: Array(4).fill(150), duration: 500, maxZoom: 19 });
  }

  addToStreetView() {
    // if (this.data[0].getGeometry() instanceof Point) {
    //   var p = <Point>this.data[0].getGeometry();
    //   this.mapService.addStreetViewPoint(p.getCoordinates());
    // }
  }


  finishLoad(data: mappingResultObject | undefined = undefined, zoomToFeature: boolean = false) {
    this.mapService.clearHighligthAllFeature('higthlihtInfo');
    if (data) {
      let feature = new Feature({ geometry: data.geomFeature?.getGeometry() });
      feature.setProperties({});
      this.mapService.highligthFeature(feature, 'higthlihtInfo');
    }
    if (zoomToFeature) {
      this.mapService.map.getView().fit(data?.geomFeature?.getGeometry()?.getExtent()!, { padding: Array(4).fill(150), duration: 500, maxZoom: 21 });
    }
    this.isLoading = false;

    // this.outputData.emit({ layerSource: this.layerSource, dataOrForm: this.mainData, formatedKeys: this.formatedKeys, typeMode: this.dataObj.typeOfDialog, telasGsu: this.telasGsu });
  }

  resolveEmit() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.outputData.emit({
          layerSource: this.layerSource,
          dataOrForm: this.mainData,
          formatedKeys: this.formatedKeys,
          typeMode: this.dataObj.typeOfDialog,
          telasGsu: this.telasGsu,
          dataFull: this.dataFull as dataToDialogInfoSearch
        } as objGeneralToSpecific);
      }, 100);
      resolve();
    });
  }

  async emitData() {
    const result = await this.resolveEmit();
  }

  unsorted() {
    return 0
  }

  setValue(key: string, value: { main: string | boolean, second: string }) {

    // this.profileForm.get(`${key}.value`).setValue({ main: value['main'], second: value['second'] });
    // // Necessita ajustes. Há redundâncias.
    // // Mudar predicado em caso de inserção de valor pesquisável
    // if ((value.main || value.second) && this.profileForm.get(`${key}.mode`).value == 0) {
    //   var type = this.profileForm.get(`${key}.type`).value
    //   // Este if está redundante. Aparentemente nunca resultará true.
    //   if ((typeof value.main == 'string' && value.main == '') || !value) {
    //     // Esta atribuição está reduntante. O valor de "mode" já é zero (condição acima).
    //     this.profileForm.get(`${key}.mode`).setValue(0);
    //   }
    //   else {
    //     this.profileForm.get(`${key}.mode`).setValue(this.typeMapper[type].default);
    //   }
    // }
    // // Condição para retornar o "mode" para zero quando o valor do campo for apagado completamente ou "selecione" no input do tipo select (quando as condições acima forem ajustadas, se tornará obsoleto)
    // else if ((typeof value.main == 'string' && value.main == '') || !value && this.profileForm.get(`${key}.mode`).value != 0) {
    //   this.profileForm.get(`${key}.mode`).setValue(0);
    // }
  }


  getType(key: string, mode: 'raw' | 'translated') {
    // if (mode == 'translated') return this.typeMapper[this.profileForm.get(`${key}.type`).value].type;
    // else return this.profileForm.get(`${key}.type`).value;
  }

  getControl(key: string, str: string) {
    // return this.profileForm.get(`${key}.${str}`)
  }

  getControlValue(key: string, str: string) {
    // return this.getControl(key, str).value
  }


  async onSubmit() {

    // var cqlResult = this.isfeService.createCqlFilter(this.profileForm, this.dataObj.typeOfDialog)

    // if (this.dataObj.typeOfDialog == 'search') {
    //   this.searchIsLoading = true;
    //   var layerSource = this.dataObj.data.fonteGS_back ? this.dataObj.data.fonteGS_back : this.dataObj.data.fonteGS_front
    //   await this.isfeService.applySearch(layerSource, cqlResult.cqlStr, this.dataObj.data, this.formatedKeys)
    //   this.searchIsLoading = false;
    // }
    // else if (this.dataObj.typeOfDialog == 'filter') {
    //   this.isfeService.applyFilter(Number(this.dataObj.data.layerId), cqlResult.cqlStr, cqlResult.filtersStorage)
    // }
  }


  clearFilter() {
    // this.isfeService.clearFilter(Number(this.dataObj.data.layerId))

    // Object.keys(this.profileForm.controls).forEach(key => {
    //   this.profileForm.get(`${key}.mode`).setValue(0);
    //   this.profileForm.get(`${key}.value`).setValue({ main: null, second: null });
    // })
  }

  isRange(key: string) {
    // if (this.profileForm.value[key]['mode'] == 21 || this.profileForm.value[key]['mode'] == 22) return true;
    // else return false;
  }

  isMap(key: string) {
    // return this.profileForm.value[key]['ismap']
  }

  isSearchable() {
    // return Object.keys(this.profileForm.controls).map(e => this.profileForm.controls[e].value.value).some(e => e != null && e != '' ? true : false)
  }


  toTop() {
    this.mapService.modalToTop(this._elementRef.nativeElement);
  }

  openEditMode() {
    this.mapService.openGeneralFeatureInfo(this.dataObj.data, this.dataObj.zoomToFeature, 'edit')
  }

  async mayEdit() {
    // this.editable = await lastValueFrom(this.apiConection.mayEditLayer(Number(this.dataObj.data.layerId)))
  }




}
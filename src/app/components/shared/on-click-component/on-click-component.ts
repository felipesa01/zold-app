import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, Inject, ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Feature } from 'ol';
import { MenuOnClickComponent } from './menu-on-click-component/menu-on-click-component';
import { MapService } from '../../../services/map-service';
import { mappingResultObject } from '../../../services/layers-service';
import { DialogModule } from '@angular/cdk/dialog';
import { NgIf } from '@angular/common';

export interface mapRecursiveResult {
  item: string | mappingResultObject | mappingResultObject[],
  children: mapRecursiveResult[] | mappingResultObject[] | []
}

@Component({
  selector: 'app-on-click-component',
  imports: [OverlayModule, DialogModule, NgIf],
  templateUrl: './on-click-component.html',
  styleUrl: './on-click-component.css',
})
export class OnClickComponent {

  isOpen = false;
  layers: string[] = [];
  isLoading: boolean = true;

  mainData!: mappingResultObject[];
  mainDataNew!: mapRecursiveResult[];

  dataToExport: mapRecursiveResult[] = [];

  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: { mappedMenu: Feature[], top: string, left: string },
    private mapService: MapService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private menuOnClickDialog: MatDialogRef<MenuOnClickComponent>,
    private cdref: ChangeDetectorRef) {
  }

  ngOnInit() {
    // this.getMappedMenu(this.data.mappedMenu.layerList, this.data.mappedMenu.coord, this.data.mappedMenu.resolution);
    this.getMappedMenu(this.data.mappedMenu);

  }

  openMenuFeatures(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxHeight = '0px';
    dialogConfig.maxWidth = '0px';
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = false;
    dialogConfig.position = { left: (this.data.left + 10).toString() + 'px', top: (this.data.top + 10).toString() + 'px' };
    dialogConfig.data = this.dataToExport;

    this.mapService.openMenuOnClickComponent(dialogConfig);
    // if (this.menuOnClickDialog instanceof MatDialogRef) this.menuOnClickDialog.close();
    // this.menuOnClickDialog = this.dialog.open(MenuOnClickComponent, dialogConfig);
  };

  translateClusterMode(clusterMode: string): { attr: string | undefined, clusterNumbers: number[] | undefined } {
    if (!clusterMode) return { attr: undefined, clusterNumbers: undefined }
    else {
      var splitted = clusterMode.split(':');
      var numbers = splitted[1].split(',').map(e => Number(e));
      return { attr: splitted[0], clusterNumbers: numbers.sort().reverse() }
    }
  }

  sortItemFromMappingResultObject(a: mapRecursiveResult, b: mapRecursiveResult) {
    if (!(a.item as mappingResultObject)?.cluster_name && !(b.item as mappingResultObject)?.cluster_name) return 0

    if ((a.item as mappingResultObject)?.cluster_name! > (b.item as mappingResultObject)?.cluster_name!) return 1
    else if ((a.item as mappingResultObject)?.cluster_name! < (b.item as mappingResultObject)?.cluster_name!) return -1
    else return 0
  }

  transformMainData() {
    this.mainDataNew = this.mainData.map(e => { return { item: e as mappingResultObject, children: [] } });
    this.layers.map(layer => {
      var dataOfLayer = this.mainDataNew.filter(d => (d.item as mappingResultObject)?.layerName === layer);
      if (dataOfLayer.length > 15) {
        var translateKeys = this.translateClusterMode(((dataOfLayer as mapRecursiveResult[])[0].item as mappingResultObject)?.cluster_mode!);
        // Remover os elementos que não podem ser agrupados por não possuírem a informação do "cluster_name"
        var unclassifiedItems = dataOfLayer.filter(e => !(e.item as mappingResultObject)?.cluster_name)
        dataOfLayer = dataOfLayer.filter(e => (e.item as mappingResultObject)?.cluster_name)
        // Caso realmente tenha alguma chave de agrupamento
        if (translateKeys.clusterNumbers) {
          var dataToExportMiddle: mapRecursiveResult[] = []
          var dataToExportLayer: mapRecursiveResult[] = [];
          // Para cada clusternumber existente, filtrar os elementos correspondentes..
          translateKeys.clusterNumbers.map((sepNumber, index) => {
            // var removeItem = [] // Lista para armazenar os valores que serão removido por não possuirem "cluster_name"
            var nameRecursiveItems = [...new Set(dataOfLayer.map(e => (e.item as mappingResultObject)?.cluster_name?.toString().slice(0, sepNumber)))].sort()
            // console.log(removeItem, nameRecursiveItems)
            // dataToExportMiddle.push({ item: 'Sem informação', children: dataOfLayer.filter((e, index) => removeItem.includes(index)) })
            // console.log(dataToExportMiddle)
            // removeItem.forEach(indexToremove => {
            //   dataOfLayer.splice(indexToremove)
            // });   // Remover itens sem grupo

            nameRecursiveItems.map(recursiveItem => {
              var children: mapRecursiveResult[] | mappingResultObject[] | [];
              //  Primeiro nível do agrupamento. Aqui as FEIÇOES serão agrupadas.
              if (index === 0 && dataOfLayer.length > 0) {
                children = dataOfLayer.filter(e => (e.item as mappingResultObject)?.cluster_name?.toString().startsWith(recursiveItem!))
                children.sort(this.sortItemFromMappingResultObject)
                dataToExportMiddle.push({ item: recursiveItem!, children: children })
              }
              //  Demais níveis do agrupamento. Aqui os GRUPOS serão agrupados.
              else {
                children = dataToExportMiddle.filter(e => e.item.toString().startsWith(recursiveItem!))
                dataToExportLayer.push({ item: recursiveItem!, children: children })
              }
            })

            // Caso seja a última iteração das chaves de agrupamento, insere o resultado no dataToExport
            if (index + 1 === translateKeys.clusterNumbers?.length) {
              // Insere o grupo dos "sem informação", se for o caso
              if (unclassifiedItems.length > 0) dataToExportMiddle.push({ item: 'Sem informação', children: unclassifiedItems })

              if (translateKeys.clusterNumbers.length === 1) this.dataToExport.push({ item: layer, children: dataToExportMiddle })
              else this.dataToExport.push({ item: layer, children: dataToExportLayer })
            }
          })
        }
      }
      else this.dataToExport.push({ item: layer, children: dataOfLayer });
    })
    // Caso o clique só tenha feições de uma camada
    if (this.dataToExport.length === 1) {
      var dataToExportAdjust: mapRecursiveResult[] = []
      this.dataToExport[0].children.map(e => { dataToExportAdjust.push(e as mapRecursiveResult) });
      this.dataToExport = dataToExportAdjust
    }
    // Caso o clique tenha feições mas não foram agrupadas porque não tinham cluster_mode preenchido (não ter uma chave de agrupamento, por exemplo)
    else if (this.dataToExport.length === 0) this.dataToExport = this.mainDataNew;
  }

  doApelidoBetter(data: string): { values: string[], sep: string } {
    var column_list: string[];
    var sep: string;

    var first_split = data.split(":");
    sep = first_split.length === 1 ? ' - ' : first_split[1]
    column_list = first_split[0].split("\\");
    return { values: column_list, sep: sep };
  }

  getMappedMenu(list: Feature[]) {
    var mappedMenu: mappingResultObject[] = [];
    if (list.length > 0) {

      list.map(item => {
        if (item) {

          let layer = this.mapService.findLayerOfFeature(item);

          mappedMenu.push({
            layerId: layer?.get('id'),
            layerName: layer?.get('name'),
            fonteGS_front: layer?.get('fonteGS_front'),
            fonteGS_back: layer?.get('fonteGS_back'),
            pk_name: layer?.get('pk_name'),
            pk_value: item.get(layer?.get('pk_name')),
            geomFeature: item,
            nameFeature: item.get(layer?.get('feat_apelido')),
            cluster_mode: '',
            cluster_name: ''
          })
        }
      });

      this.mainData = mappedMenu;
      this.layers = [...new Set(this.mainData.map(item => item.layerName))]
      this.transformMainData();

      if (this.mainData.length > 1) {
        // this.fillAllFeatureNameItems();
        this.openMenuFeatures();
        this.isLoading = false;
        this.closeMyMenu();
      }
      else if (this.mainData.length == 1) {
        this.featureSelected(this.mainData[0]);
        this.isLoading = false;
        this.closeMyMenu();
      }
      else {
        this.ngOnDestroy();
      }
    }
    else setTimeout(() => {
      this.closeMyMenu()
    }, 500);
  }


  getItemsFromLayerName(layerName: string) {
    var list = this.mainData.filter(e => e.layerName === layerName);
    list.sort();
    return list;
  }

  ngAfterViewInit(): void {
    this.cdref.detectChanges();
  }

  featureSelected(item: mappingResultObject) {
    this.mapService.openGeneralFeatureInfo(item);
  }


  isExpandable(layerName: string) {
    var list = this.getItemsFromLayerName(layerName);
    if (list.length > 1) return true;
    else return false;
  };

  closeMyMenu() {
    // this.menuTrigger?.closeMenu();
    this.mapService.clearHighligthAllFeature('higthlihtOptionToInfo');
    this.mapService.closeOnClickComponent();
  }

  ngOnDestroy() {
    this.closeMyMenu();
  }

}

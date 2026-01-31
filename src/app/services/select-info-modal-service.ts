import { Injectable, Type } from '@angular/core';
import { GenericInfoModalComponent } from '../components/shared/generic-info-modal-component/generic-info-modal-component';

@Injectable({
  providedIn: 'root',
})
export class SelectInfoModalService {

  modalInfoList: { component: any, layerOfUse: number[] }[] = [
    {
      component: GenericInfoModalComponent,
      layerOfUse: []
    }
  ];


  getComponent(layerId: number) {
    const modal = this.modalInfoList.filter((e) => e.layerOfUse.includes(layerId));

    if (modal.length === 0) return GenericInfoModalComponent as Type<any>;
    else return modal[0].component as Type<any>;
  }

}

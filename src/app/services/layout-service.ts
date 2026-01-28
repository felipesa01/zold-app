import { Injectable, signal } from '@angular/core';
import { FixedFeature, MenuItemConfig } from '../types/layout.types';
import { MENU_CONFIG } from '../../config/menu';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  fixedSidebarOpened = signal(false);

  expandableSidebarOpened = signal(false);

  activeFeature = signal<FixedFeature | null>(null);

  openFeature(feature: FixedFeature) {
    if (this.activeFeature() === feature) {
      this.activeFeature.set(null);
      this.expandableSidebarOpened.set(false);
    } else {
      this.activeFeature.set(feature);
      this.expandableSidebarOpened.set(true);
    }
  }

  closeExpandable() {
    this.activeFeature.set(null);
    this.expandableSidebarOpened.set(false);
  }

  getActiveMenuItem(mode: 'map' | 'workspace', user?: any) {
    const menu = this.getMenu(mode, user);
    return menu.find(item => item.id === this.activeFeature());
  }


  getMenu(mode: 'map' | 'workspace', user?: any): MenuItemConfig[] {
    return MENU_CONFIG[mode].filter(item => {
      // Se não existe user, ignora regras de permissão/plano
      if (!user) return true;
      if (item.permission && !user.permissions?.includes(item.permission)) {
        return false;
      }
      if (item.planRequired && !item.planRequired.includes(user.plan)) {
        return false;
      }
      return true;
    });
  }




}

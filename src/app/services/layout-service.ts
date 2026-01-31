import { computed, inject, Injectable, signal } from '@angular/core';
import { SideMenuItemId, SideMenuItemConfig } from '../types/layout.types';
import { MENU_CONFIG } from '../../config/menu';
import { ResponsiveService } from './responsive-service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  private responsive = inject(ResponsiveService);
  isMobile = computed(() => this.responsive.isSmallScreen());

  fixedSidebarOpened = signal(false);
  expandableSidebarOpened = signal(false);
  activeFeature = signal<SideMenuItemId | null>(null);

  openFeature(feature: SideMenuItemId) {
    if (this.isMobile()) {
      this.activeFeature.set(feature);
      this.expandableSidebarOpened.set(true);
      return
    }

    if (this.activeFeature() === feature) {
      this.activeFeature.set(null);
      this.expandableSidebarOpened.set(false);
    } else {
      this.activeFeature.set(feature);
      this.expandableSidebarOpened.set(true);
    }
  }

  closeExpandable() {
    this.expandableSidebarOpened.set(false);
    if (!this.isMobile()) {
      this.activeFeature.set(null);

    }
  }

  getActiveMenuItem(mode: 'map' | 'workspace', user?: any) {
    const menu = this.getMenu(mode, user);
    return menu.find(item => item.id === this.activeFeature());
  }


  getMenu(mode: 'map' | 'workspace', user?: any): SideMenuItemConfig[] {
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

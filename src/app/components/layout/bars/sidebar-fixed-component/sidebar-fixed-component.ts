import { NgFor } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ResponsiveService } from '../../../../services/responsive-service';
import { LayoutService } from '../../../../services/layout-service';
import { ModeService } from '../../../../services/mode-service';
import { MapService } from '../../../../services/map-service';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SideMenuItemId, SideMenuItemConfig } from '../../../../types/layout.types';

@Component({
  selector: 'app-sidebar-fixed-component',
  imports: [MatSidenavModule, MatIconModule, MatButtonModule, NgFor, MatTooltipModule],
  templateUrl: './sidebar-fixed-component.html',
  styleUrl: './sidebar-fixed-component.css',
})
export class SidebarFixedComponent {
  private responsive = inject(ResponsiveService);
  isMobile = computed(() => this.responsive.isSmallScreen());

  private layoutService = inject(LayoutService);



  private sidebarControls = inject(LayoutService);
  fixedSidebarOpened = this.sidebarControls.fixedSidebarOpened;
  expandableSidebarOpened = this.sidebarControls.expandableSidebarOpened;

  private modeControl = inject(ModeService);
  modeTurn = this.modeControl.mode;

  private router = inject(Router);

  constructor(private mapService: MapService) {
    this.router.events.subscribe(() => {
      this.modeIcon = this.router.url.startsWith('/map') ? 'space_dashboard' : 'map';
    });
  }


  expanded = signal(true);
  actived = signal<SideMenuItemId | null>(null);


  // menuItems = computed<{
  //   icon: string;
  //   label: string;
  //   feature: FixedFeature;
  // }[]>(() => {
  //   return this.modeTurn() === 'map'
  //     ? [
  //       { icon: 'layers', label: 'Camadas', feature: 'layers' },
  //       { icon: 'view_module', label: 'Módulos', feature: 'modules' },
  //       { icon: 'list', label: 'Listas', feature: 'lists' },
  //     ]
  //     : [
  //       { icon: 'ballot', label: 'Listas', feature: 'entities' },
  //       { icon: 'assessment', label: 'Relatórios', feature: 'reports' },
  //       { icon: 'space_dashboard', label: 'Dashboard', feature: 'dashboard' },
  //     ];
  // });

  menuItems = computed(() => {
    return this.layoutService.getMenu(this.modeTurn(), undefined);
  });

  modeIcon: 'map' | 'space_dashboard' = this.modeTurn() === 'map' ? 'space_dashboard' : 'map';

  configItems = [
    { icon: undefined, label: 'Alternar modo', onClick: () => this.changeMode() },
    { icon: 'account_circle', label: 'Conta' }
  ];

  toggle() {
    this.expanded.set(!this.expanded());
  }

  // setActive(button: string) {
  //   this.actived = this.actived === button ? undefined : button;
  //   if (this.actived) {
  //     this.expandableSidebarOpened.set(true);
  //   }
  //   else {
  //     this.expandableSidebarOpened.set(false);
  //   }
  //   if (this.isMobile()) { this.fixedSidebarOpened.set(false) }
  // }

  closeFixedSidebar() {
    this.sidebarControls.fixedSidebarOpened.set(false)
  }

  changeMode() {
    this.sidebarControls.closeExpandable();
    if (this.modeTurn() == 'map') {
      this.modeIcon = 'map'
      this.router.navigate(['/workspace']);
    }
    else {
      this.modeIcon = 'space_dashboard'
      this.router.navigate(['/map']);
    }

  }

  setActive(feature: SideMenuItemConfig) {
    // Caso NÃO seja expandível → executa ação e sai
    if (!feature.expandible) {
      this.router.navigate(feature?.route!)
      this.actived.set(null);
      this.sidebarControls.closeExpandable();
      if (this.isMobile()) {
        this.fixedSidebarOpened.set(false);
      }
      return;
    }
    // Caso SEJA expandível → controla sidebar
    if (!this.isMobile()) {
      if (this.actived() === feature.id) {
        this.actived.set(null);
        this.sidebarControls.closeExpandable();
      } else {
        this.actived.set(feature.id);
        this.sidebarControls.openFeature(feature.id);
      }
    } else {
      this.actived.set(feature.id);
      this.sidebarControls.openFeature(feature.id);
      this.fixedSidebarOpened.set(false);
    }
  }
}

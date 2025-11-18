import { NgFor } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ResponsiveService } from '../../../../services/responsive-service';
import { LayoutService } from '../../../../services/layout-service';

@Component({
  selector: 'app-sidebar-fixed-component',
  imports: [MatSidenavModule, MatIconModule, MatButtonModule, NgFor],
  templateUrl: './sidebar-fixed-component.html',
  styleUrl: './sidebar-fixed-component.css',
})
export class SidebarFixedComponent {
  private responsive = inject(ResponsiveService);
  isMobile = computed(() => this.responsive.isSmallScreen());

  private sidebarControls = inject(LayoutService);
  fixedSidebarOpened = this.sidebarControls.fixedSidebarOpened;
  expandableSidebarOpened = this.sidebarControls.expandableSidebarOpened;


  expanded = signal(true);
  actived: string | undefined;

  menuItems = [
    { icon: 'layers', label: 'Camadas' },
    { icon: 'view_module', label: 'Módulos' },
    { icon: 'ballot', label: 'Itens' },
  ];

  configItems = [
    { icon: 'space_dashboard', label: 'Alternar modo' },
    { icon: 'account_circle', label: 'Conta' }
  ];

  toggle() {
    this.expanded.set(!this.expanded());
  }

  setActive(button: string) {
    this.actived = this.actived === button ? undefined : button;
    if (this.actived) {
      this.expandableSidebarOpened.set(true);
    }
    else {
      this.expandableSidebarOpened.set(false);
    }
    if (this.isMobile()) {this.fixedSidebarOpened.set(false)}
  }

  closeFixedSidebar() {
    this.sidebarControls.fixedSidebarOpened.set(false)
  }

}

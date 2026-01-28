import { Component, computed, inject } from '@angular/core';
import { ResponsiveService } from '../../../../services/responsive-service';
import { MatIcon } from '@angular/material/icon';
import { LayoutService } from '../../../../services/layout-service';
import { ModeService } from '../../../../services/mode-service';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-sidebar-expandable-component',
  imports: [MatIcon, NgComponentOutlet],
  templateUrl: './sidebar-expandable-component.html',
  styleUrl: './sidebar-expandable-component.css',
})
export class SidebarExpandableComponent {
  private responsive = inject(ResponsiveService);
  isMobile = computed(() => this.responsive.isSmallScreen());

  private layout = inject(LayoutService);

  expandableSidebarOpened = this.layout.expandableSidebarOpened;
  activeFeature = this.layout.activeFeature;

  private modeControl = inject(ModeService);
  modeTurn = this.modeControl.mode;

  mode = computed(() => 'workspace'); // ajuste conforme seu app
  activeMenuItem = computed(() =>
    this.layout.getMenu(this.modeTurn()).find(
      item => item.id === this.activeFeature()
    )
  );


  close() {
    this.expandableSidebarOpened.set(false)
  }

}

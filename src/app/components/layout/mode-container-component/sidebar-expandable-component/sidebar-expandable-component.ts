import { Component, computed, inject } from '@angular/core';
import { ResponsiveService } from '../../../../services/responsive-service';
import { MatIcon } from '@angular/material/icon';
import { LayoutService } from '../../../../services/layout-service';

@Component({
  selector: 'app-sidebar-expandable-component',
  imports: [MatIcon],
  templateUrl: './sidebar-expandable-component.html',
  styleUrl: './sidebar-expandable-component.css',
})
export class SidebarExpandableComponent {
  private responsive = inject(ResponsiveService);
  isMobile = computed(() => this.responsive.isSmallScreen());

  private sidebarControls = inject(LayoutService);
  expandableSidebarOpened = this.sidebarControls.expandableSidebarOpened;


  close() {
    this.expandableSidebarOpened.set(false)
  }

}

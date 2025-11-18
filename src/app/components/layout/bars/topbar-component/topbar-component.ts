import { NgFor } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutService } from '../../../../services/layout-service';

@Component({
  selector: 'app-topbar-component',
  imports: [MatIconModule, MatButtonModule, NgFor],
  templateUrl: './topbar-component.html',
  styleUrl: './topbar-component.css',
})
export class TopbarComponent {

  private sidebarControls = inject(LayoutService);
  fixedSidebarOpened = this.sidebarControls.fixedSidebarOpened;
  expandableSidebarOpened = this.sidebarControls.expandableSidebarOpened;

  openFixedSidebar() {
    this.expandableSidebarOpened.set(false)
    this.fixedSidebarOpened.set(true)
  }

  openExpandableSidebar() {
    this.expandableSidebarOpened.set(!this.expandableSidebarOpened())
  }

}

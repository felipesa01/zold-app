import { Component, computed, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ResponsiveService } from '../../../services/responsive-service';
import { BottomSheetService } from '../../../services/bottom-sheet-service';
import { TopbarComponent } from '../bars/topbar-component/topbar-component';
import { LayoutService } from '../../../services/layout-service';
import { SidebarExpandableComponent } from './sidebar-expandable-component/sidebar-expandable-component';
import { ModeService } from '../../../services/mode-service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mode-container-component',
  imports: [ MatSidenavModule, SidebarExpandableComponent, RouterOutlet],
  templateUrl: './mode-container-component.html',
  styleUrl: './mode-container-component.css',
})
export class ModeContainerComponent {
  private responsive = inject(ResponsiveService);
  isMobile = computed(() => this.responsive.isSmallScreen());


  private sidebarControls = inject(LayoutService);
  fixedSidebarOpened = this.sidebarControls.fixedSidebarOpened;
  expandableSidebarOpened = this.sidebarControls.expandableSidebarOpened;


  private modeControl = inject(ModeService);
  modeTurn = this.modeControl.mode;

  constructor(private sheet: BottomSheetService, private router: Router) {
    this.router.events.subscribe(() => {
      this.modeTurn.set(
        this.router.url.startsWith('/workspace') ? 'workspace' : 'map'
      );
    });

  }


  openBottomSheet() {
    this.sheet
      .open(TopbarComponent, {
        data: { message: 'Olá!' },
        initialState: 'half'
      })
      .afterClosed()
      .subscribe(value => {
        console.log('Fechou com:', value);
      });
  }

  mapMode(): boolean {
    return this.modeTurn() == 'map'
  }



}

import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from "../../modes/map-mode/map-component/map-component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { ResponsiveService } from '../../../services/responsive-service';
import { BottomSheetService } from '../../../services/bottom-sheet-service';
import { TopbarComponent } from '../bars/topbar-component/topbar-component';
import { LayoutService } from '../../../services/layout-service';
import { SidebarExpandableComponent } from './sidebar-expandable-component/sidebar-expandable-component';
import { QrReaderService } from '../../../services/qr-reader.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-mode-container-component',
  imports: [MapComponent, MatSidenavModule, SidebarExpandableComponent, MatButtonModule, MatIcon],
  templateUrl: './mode-container-component.html',
  styleUrl: './mode-container-component.css',
})
export class ModeContainerComponent {
  private responsive = inject(ResponsiveService);
  isMobile = computed(() => this.responsive.isSmallScreen());


  private sidebarControls = inject(LayoutService);
  fixedSidebarOpened = this.sidebarControls.fixedSidebarOpened;
  expandableSidebarOpened = this.sidebarControls.expandableSidebarOpened;

  constructor(private sheet: BottomSheetService, private qr: QrReaderService) {

  }

  abrirLeitor() {
    this.qr.abrirLeitor();
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

  

}

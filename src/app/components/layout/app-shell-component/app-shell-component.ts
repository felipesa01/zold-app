import { Component, computed, effect, inject, signal, ViewChild } from '@angular/core';
import { SidebarFixedComponent } from '../bars/sidebar-fixed-component/sidebar-fixed-component';
import { ModeContainerComponent } from '../mode-container-component/mode-container-component';
import { NgIf, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ResponsiveService } from '../../../services/responsive-service';
import { TopbarComponent } from '../bars/topbar-component/topbar-component';
import { LayoutService } from '../../../services/layout-service';
import { textHeights } from 'ol/render/canvas';
import { ModeService } from '../../../services/mode-service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-app-shell-component',
  imports: [MatSidenavModule, MatIconModule, MatButtonModule, SidebarFixedComponent, ModeContainerComponent, TopbarComponent],
  templateUrl: './app-shell-component.html',
  styleUrl: './app-shell-component.css',
})
export class AppShellComponent {
  private responsive = inject(ResponsiveService);
  isMobile = computed(() => this.responsive.isSmallScreen());

  private sidebarControls = inject(LayoutService);
  fixedSidebarOpened = this.sidebarControls.fixedSidebarOpened;
  expandableSidebarOpened = this.sidebarControls.expandableSidebarOpened;

  private readonly router = inject(Router);
  public readonly isLoginPage = signal(false);

  public readonly sidebarOpened = computed(() => {

    if (this.isLoginPage()) {
      return false;
    }
    if (!this.isMobile()) {
      return true;
    }
    return this.fixedSidebarOpened();
  });

  // referênica para o componente do material
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {

        this.isLoginPage.set(
          this.router.url.startsWith('/login')
        );

      });

    effect(() => {

      const login = this.isLoginPage();
      const mobile = this.isMobile();

      this.sidebarControls.fixedSidebarOpened.set(
        !login && !mobile
      );

    });
  }

  actived: string | undefined;



}

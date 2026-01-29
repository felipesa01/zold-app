import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LayoutService } from '../../../../../services/layout-service';
import { ResponsiveService } from '../../../../../services/responsive-service';

@Component({
  selector: 'app-listas-menu-component',
  imports: [CommonModule, MatIconModule],
  templateUrl: './listas-menu-component.html',
  styleUrl: './listas-menu-component.css',
})
export class ListasMenuComponent {

  private sidebarControls = inject(LayoutService);
  private responsive = inject(ResponsiveService);
  isMobile = computed(() => this.responsive.isSmallScreen());

  entities = [
    {
      label: 'Projetos',
      icon: 'folder',
      route: '/workspace/entities/projetos'
    },
    {
      label: 'Armadilhas',
      icon: 'bug_report',
      route: '/workspace/entities/armadilhas'
    },
    {
      label: 'Capturas',
      icon: 'photo_camera',
      route: '/workspace/entities/capturas'
    }
  ];

  constructor(private router: Router) { }

  goTo(route: string) {
    this.router.navigate([route]);
    if (this.isMobile()) {
      this.sidebarControls.closeExpandable()
    }

  }

}

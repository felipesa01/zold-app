import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, inject, signal, Input, effect } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LayoutService } from '../../../../../services/layout-service';
import { ResponsiveService } from '../../../../../services/responsive-service';
import { ApiConnectionService, ProjetoServicos } from '../../../../../services/api-connection-service';
import { ProjectContextService } from '../../../../../services/project-context.service';
import { ModeService } from '../../../../../services/mode-service';


@Component({
  selector: 'app-servicos-det-lista-component',
  imports: [CommonModule, MatIconModule],
  templateUrl: './servicos-det-lista-component.html',
  styleUrl: './servicos-det-lista-component.css',
})
export class ServicosDetListaComponent implements AfterViewInit {

  @Input() servicosListaExpansivel!: boolean

  private sidebarControls = inject(LayoutService);
  private responsive = inject(ResponsiveService);
  private projectContext = inject(ProjectContextService)
  isMobile = computed(() => this.responsive.isSmallScreen());


  private modeControl = inject(ModeService);
  modeTurn = this.modeControl.mode;

  activeFeature = this.sidebarControls.activeFeature;
  activeMenuItem = computed(() =>
    this.sidebarControls.getMenu(this.modeTurn()).find(
      item => item.id === this.activeFeature()
    )
  );

  selectedProject = this.projectContext.selected

  selectedServico!: ProjetoServicos;

  data = signal<ProjetoServicos[]>([])
  expandedId: string | null = null;

  constructor(private router: Router, private apiConnection: ApiConnectionService) {
    effect(() => {
      this.selectedProject();
      this.loadData()
    })
  }

  ngAfterViewInit(): void {
    this.loadData()
  }


  loadData() {

    this.apiConnection
      .getServicosByProject(this.selectedProject()?.id!)
      .subscribe(result => {
        this.data.set(result)
      })

  }

  goTo(routeSevico: string, route: string) {
    this.router.navigate([`${routeSevico + route}`]);
    if (this.isMobile()) {
      this.sidebarControls.closeExpandable()
    }
  }

  toggle(entity: ProjetoServicos) {
    if (this.servicosListaExpansivel) {
      if (!entity.hasData) return;
      this.expandedId =
        this.expandedId === entity.id ? null : entity.id;
    }
    else {
      this.router.navigate([entity.route, this.activeFeature()]);
    }

  }

}

import { CommonModule } from "@angular/common";
import { Component, AfterViewInit, Input, inject, computed, signal, effect } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { ProjetoServico, ApiConnectionService } from "../../../../../services/api-connection-service";
import { LayoutService } from "../../../../../services/layout-service";
import { ModeService } from "../../../../../services/mode-service";
import { ProjectContextService } from "../../../../../services/project-context.service";
import { ResponsiveService } from "../../../../../services/responsive-service";
import { forkJoin } from "rxjs";
import { PermissionService } from "../../../../../services/permission-service";

@Component({
  selector: 'app-servicos-det-lista-component',
  imports: [CommonModule, MatIconModule],
  templateUrl: './servicos-det-lista-component.html',
  styleUrl: './servicos-det-lista-component.css',
})
export class ServicosDetListaComponent implements AfterViewInit {

  @Input() servicosListaExpansivel!: boolean;

  private sidebarControls = inject(LayoutService);
  private responsive = inject(ResponsiveService);
  private projectContext = inject(ProjectContextService);
  private permissions = inject(PermissionService);

  isMobile = computed(() => this.responsive.isSmallScreen());

  private modeControl = inject(ModeService);

  modeTurn = this.modeControl.mode;

  activeFeature = this.sidebarControls.activeFeature;

  activeMenuItem = computed(() =>
    this.sidebarControls
      .getMenu(this.modeTurn())
      .find(item => item.id === this.activeFeature())
  );

  selectedProject = this.projectContext.selected;

  selectedServico!: ProjetoServico;

  data = signal<ProjetoServico[]>([]);

  expandedId: string | null = null;

  constructor(
    private router: Router,
    private apiConnection: ApiConnectionService
  ) {

    effect(() => {
      this.selectedProject();
      this.loadData();
    });

  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  ordenarProjetoServicos = (
    a: ProjetoServico,
    b: ProjetoServico
  ): number => {
    return a.nome.localeCompare(b.nome, "pt-BR");
  };

  // loadData() {

  //   const projectId = this.selectedProject()?.id;

  //   if (!projectId) return;


  //   this.apiConnection
  //     .getServicosByProject_new(projectId)
  //     .subscribe(result => {

  //       const servicos = result.servicosAtivos || [];

  //       servicos.sort(this.ordenarProjetoServicos);

  //       this.data.set(servicos);

  //     });

  //   this.expandedId = null;

  // }

  loadData() {

    const projectId = this.selectedProject()?.id;

    if (!projectId) return;

    const isDashboard =
      this.activeMenuItem()?.id == 'dashboard';

    if (isDashboard) {

      forkJoin({
        ativos: this.apiConnection.getServicosByProject_new(
          projectId
        ),
        disponiveis: this.apiConnection.findProjetoServicos(
          projectId
        )
      }).subscribe(result => {

        const servicosAtivosIds =
          result.ativos.servicosAtivos.map(
            servico => servico.id
          );

        const servicos =
          result.disponiveis.servicos.filter(
            servico =>
              servico.dashboard && this.permissions.has('dashboards.view') &&
              servicosAtivosIds.includes(servico.id)
          );

        servicos.sort(this.ordenarProjetoServicos);

        this.data.set(servicos);

      });

    } else {

      this.apiConnection
        .getServicosByProject_new(projectId)
        .subscribe(result => {

          const servicos =
            result.servicosAtivos || [];

          servicos.sort(this.ordenarProjetoServicos);

          this.data.set(servicos);

        });

    }

    this.expandedId = null;

  }


  goTo(routeSevico: string, route: string) {

    this.router.navigate([
      `${routeSevico + route}`
    ]);

    if (this.isMobile()) {
      this.sidebarControls.closeExpandable();
    }

  }

  toggle(entity: ProjetoServico) {

    if (this.servicosListaExpansivel) {

      this.expandedId =
        this.expandedId === entity.id
          ? null
          : entity.id;

      return;
    }

    this.router.navigate([
      entity.route,
      this.activeFeature()
    ]);

  }

}
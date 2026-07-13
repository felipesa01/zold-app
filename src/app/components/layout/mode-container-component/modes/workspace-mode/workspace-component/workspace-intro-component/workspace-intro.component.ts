import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ApiConnectionService, ProjetoServico, ProjetoServicoItem } from '../../../../../../../services/api-connection-service';
import { ProjectContextService } from '../../../../../../../services/project-context.service';


@Component({
  standalone: true,
  selector: 'app-workspace-intro',
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './workspace-intro.component.html',
  styleUrls: ['./workspace-intro.component.css']
})
export class WorkspaceIntroComponent {

  private router = inject(Router);
  private api = inject(ApiConnectionService);
  private projectContext = inject(ProjectContextService);

  projects = this.projectContext.projects;
  selectedProject = this.projectContext.selected;
  selectedId = this.projectContext.selectedId;

  servicosAtivos = signal<ProjetoServico[]>([]);

  constructor() {

    effect(() => {

      const projectId =
        this.selectedProject()?.id;

      if (!projectId) {
        this.servicosAtivos.set([]);
        return;
      }

      this.loadServicos(projectId);

    });

  }

  ngOnInit() {

    this.api.listarProjetos().subscribe(projects => {
      this.projectContext.setProjects(projects);
    });

  }

  loadServicos(projectId: string) {

    this.api
      .getServicosByProject_new(projectId)
      .subscribe(result => {

        this.servicosAtivos.set(
          result.servicosAtivos || []
        );

      });

  }

  onProjectChange(event: Event) {

    const id =
      (event.target as HTMLSelectElement)
        .value || null;

    this.projectContext.selectProjectById(id);

  }

  openServico(
    servico: ProjetoServico
  ) {

    if (!servico.itens?.length) {
      return;
    }

    const firstItem = servico.itens[0];

    this.router.navigate([
      `${servico.route}${firstItem.route}`
    ]);

  }

  goTo(
    item: ProjetoServicoItem,
    servico: ProjetoServico
  ) {

    this.router.navigate([
      `${servico.route}${item.route}`
    ]);

  }

}
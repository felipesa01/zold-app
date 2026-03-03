import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterModule, Router } from '@angular/router';
import { ProjectContextService } from '../../../../../../services/project-context.service';
import { ApiConnectionService } from '../../../../../../services/api-connection-service';

@Component({
  selector: 'app-workspace-component',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './workspace-component.html',
  styleUrl: './workspace-component.css',
})
export class WorkspaceComponent implements OnInit {

  private projectContext = inject(ProjectContextService);
  private api = inject(ApiConnectionService);

  projects = this.projectContext.projects;
  selectedProject = this.projectContext.selected;
  selectedId = this.projectContext.selectedId;

  isProject: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isProject = this.router.url.startsWith('/workspace/entities/projetos') ? true : false;
    });

  }

  ngOnInit() {
    this.api.listarProjetos().subscribe(projects => {
      this.projectContext.setProjects(projects);
    });
  }

  onProjectChange(event: Event) {
    const id = (event.target as HTMLSelectElement).value || null;
    this.projectContext.selectProjectById(id);
  }
}

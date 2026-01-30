import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ApiConnectionService } from '../../../../../../../services/api-connection-service';
import { ProjectContextService } from '../../../../../../../services/project-context.service';


@Component({
  standalone: true,
  selector: 'app-workspace-intro',
  imports: [CommonModule, MatIconModule, RouterModule],
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

  ngOnInit() {
    this.api.listarProjetos().subscribe(projects => {
      this.projectContext.setProjects(projects);
    });
  }

  onProjectChange(event: Event) {
    const id = (event.target as HTMLSelectElement).value || null;
    this.projectContext.selectProjectById(id);
  }

  go(target: 'armadilhas' | 'capturas') {
    this.router.navigate([`/workspace/entities/${target}`]);
  }
}

import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { DashboardDataService } from '../../services/dashboard-data.service';
import { DashboardTrocaInterval } from '../../models/interval-stats-model';
import { ProjectContextService } from '../../../../../../../../services/project-context.service';
import { ApiConnectionService } from '../../../../../../../../services/api-connection-service';

@Component({
  selector: 'app-interval-stats',
  imports: [CommonModule],
  templateUrl: './interval-stats.html',
  styleUrl: './interval-stats.css',
})
export class IntervalStatsComponent {

  private dataService = inject(DashboardDataService);

  private source = signal<DashboardTrocaInterval[]>([]);
  private projectContext = inject(ProjectContextService);
  selectedProject = this.projectContext.selected;

  constructor(private apiConnection: ApiConnectionService) {
    effect(() => {
      this.selectedProject();
      this.loadData()
    })
  }

  stats = computed(() =>
    this.source().sort((a, b) => a.tipo.localeCompare(b.tipo))
  );

  private loadData() {
    this.apiConnection.getIntervalosTroca(this.selectedProject()?.id!).subscribe({
      next: data => this.source.set(data),
      error: err => console.error('Erro ao carregar intervalos de troca', err)
    });
  }

}

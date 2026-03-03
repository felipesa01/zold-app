import { CommonModule, NgFor } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DashboardDataService } from '../../services/dashboard-data.service';
import { ProjectContextService } from '../../../../../../../../services/project-context.service';
import { DashboardKpi } from '../../models/KPI-model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { delay } from 'rxjs';


@Component({
  selector: 'app-kpi-cards',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './kpi-cards.html',
  styleUrl: './kpi-cards.css',
})
export class KpiCardsComponent {

  private dataService = inject(DashboardDataService);
  private projectContext = inject(ProjectContextService);
  selectedProject = this.projectContext.selected;

  kpis = signal<DashboardKpi[]>([]);

  loading = signal(false);

  constructor() {
    effect(() => {
      this.selectedProject();
      this.loadData()
    })
  }


  loadData() {
    this.loading.set(true);
    this.dataService.getKpis(this.selectedProject()?.id!).pipe(delay(2000)).subscribe(result => {
      this.kpis.set(result)
      this.loading.set(false);
    })

  }
}
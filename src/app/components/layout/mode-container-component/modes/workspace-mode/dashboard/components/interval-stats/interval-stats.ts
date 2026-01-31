import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { DashboardDataService } from '../../services/dashboard-data.service';
import { DashboardTrocaInterval } from '../../models/interval-stats-model';

@Component({
  selector: 'app-interval-stats',
  imports: [CommonModule],
  templateUrl: './interval-stats.html',
  styleUrl: './interval-stats.css',
})
export class IntervalStatsComponent {

  private dataService = inject(DashboardDataService);

  private source = signal<DashboardTrocaInterval[]>([]);

  constructor() {
    this.load();
  }

  stats = computed(() =>
    this.source().sort((a, b) => a.tipo.localeCompare(b.tipo))
  );

  private load() {
    this.dataService.getIntervalosTroca().subscribe({
      next: data => this.source.set(data),
      error: err => console.error('Erro ao carregar intervalos de troca', err)
    });
  }

}

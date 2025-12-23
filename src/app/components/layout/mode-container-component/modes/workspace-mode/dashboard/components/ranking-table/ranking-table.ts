import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { DashboardCriticalTrap } from '../../models/ranking-model';
import { DashboardDataService } from '../../services/dashboard-data.service';

@Component({
  selector: 'app-ranking-table',
  imports: [CommonModule],
  templateUrl: './ranking-table.html',
  styleUrl: './ranking-table.css',
})
export class RankingTableComponent {

  private dataService = inject(DashboardDataService);

  /** ranking completo vindo do service */
  private rankingSource = signal<DashboardCriticalTrap[]>([]);

  /** quantidade de linhas exibidas (top N) */
  topN = signal(10);

  constructor() {
    this.loadRanking();
  }

  /** ranking ordenado (defensivo) */
  ranking = computed(() =>
    [...this.rankingSource()]
      .sort((a, b) => b.scoreCriticidade - a.scoreCriticidade)
      .slice(0, this.topN())
  );

  private loadRanking() {
    this.dataService.getRankingCritico().subscribe({
      next: data => this.rankingSource.set(data),
      error: err => console.error('Erro ao carregar ranking crítico', err)
    });
  }

  // ----------------------------
  // Hooks de interação (futuro)
  // ----------------------------

  onSelectTrap(trap: DashboardCriticalTrap) {
    // Aqui você vai integrar com DashboardStateService
    // Ex:
    // this.state.selectedArmadilhaId.set(trap.armadilhaId);
    console.log('Armadilha selecionada:', trap.armadilhaId);
  }
}

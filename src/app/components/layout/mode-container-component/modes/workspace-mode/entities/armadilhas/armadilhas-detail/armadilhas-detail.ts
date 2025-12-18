import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartType, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CAPTURAS_MOCK } from '../../capturas/captura.mock';
import { Captura } from '../../capturas/captura.model';
import { Armadilha } from '../armadilha.model';
import { ARMADILHAS_MOCK } from '../armadilhas.mock';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-armadilhas-detail',
  imports: [CommonModule, BaseChartDirective, MatButtonModule, MatIconModule],
  templateUrl: './armadilhas-detail.html',
  styleUrl: './armadilhas-detail.css',
})
export class ArmadilhasDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  armadilhaId = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id'))
    )
  );

  armadilha = computed(() => {
    const id = this.armadilhaId();
    if (!id) return undefined;
    return ARMADILHAS_MOCK.find(a => a.id === id);
  });

  capturas = computed<Captura[]>(() =>
    CAPTURAS_MOCK
      .filter(c => c.armadilhaId === this.armadilhaId())
      .sort((a, b) => a.data.localeCompare(b.data))
  );

  chartType: ChartType = 'line';

  chartData: ChartConfiguration['data'] = {
    labels: this.capturas().map(c => c.data),
    datasets: [
      {
        label: 'Aedes',
        data: this.capturas().map(c => c.numAedes),
        tension: 0.3,
        borderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 6,
        hitRadius: 8,

      },
      {
        label: 'Culex',
        data: this.capturas().map(c => c.numCulex),
        tension: 0.3,
        borderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 6,
        hitRadius: 8
      },
      {
        label: 'Outras',
        data: this.capturas().map(c => c.numOutras),
        tension: 0.3,
        borderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 6,
        hitRadius: 8
      },
      {
        label: 'Total',
        data: this.capturas().map(c => c.numTotal),
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        hitRadius: 10,
      }
    ]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'point',
      intersect: true
    },
    plugins: {
      tooltip: {
        mode: 'point',
        intersect: true
      },
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };

  goBack() {
    this.router.navigate(['/workspace/entities/armadilhas']);
  }

}

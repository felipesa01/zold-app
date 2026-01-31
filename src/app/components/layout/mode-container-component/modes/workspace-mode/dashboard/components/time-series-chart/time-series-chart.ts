import { AfterViewInit, Component, computed, HostListener, inject, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardDataService } from '../../services/dashboard-data.service';
import { ptBR } from 'date-fns/locale';
import { APLICACOES_MOCK } from '../../../entities/aplicacoes/aplicacoes.mock';

@Component({
  selector: 'app-time-series-chart',
  imports: [BaseChartDirective],
  templateUrl: './time-series-chart.html',
  styleUrl: './time-series-chart.css',
})
export class TimeSeriesChartComponent implements AfterViewInit {

  @ViewChild(BaseChartDirective)
  chart?: BaseChartDirective;

  @HostListener('window:resize')
  onResize() {
    this.chart?.chart?.resize();
  }

  ngAfterViewInit() {
    // Aguarda o layout estabilizar
    setTimeout(() => {
      this.chart?.chart?.resize();
    }, 0);
  }

  private dataService = inject(DashboardDataService);

  data = toSignal(this.dataService.getTimeSeries(), { initialValue: [] });

  chartData = computed<ChartConfiguration<'line', { x: number; y: number }[]>['data']>(() => {

    const series = this.data(); // DashboardTimePoint[]

    return {
      datasets: [

        // TOTAL
        {
          label: 'Total',
          data: series.map(p => ({
            x: p.timestamp,
            y: p.numTotal
          })),
          borderColor: '#d32f2f',
          backgroundColor: 'rgba(211, 47, 47, 0.5)',
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 2,
        },

        // AEDES
        {
          label: 'Aedes',
          data: series.map(p => ({
            x: p.timestamp,
            y: p.numAedes
          })),
          borderColor: '#1e88e5',
          backgroundColor: 'rgba(30, 136, 229, 0.5)',
          tension: 0.3,
          borderWidth: 1,
          pointRadius: 2,
        },

        // CULEX
        {
          label: 'Culex',
          data: series.map(p => ({
            x: p.timestamp,
            y: p.numCulex
          })),
          borderColor: '#8e24aa',
          backgroundColor: 'rgba(141, 36, 170, 0.5)',
          tension: 0.3,
          borderWidth: 1,
          pointRadius: 2,
        },

        // OUTRAS
        {
          label: 'Outras',
          data: series.map(p => ({
            x: p.timestamp,
            y: p.numOutras
          })),
          borderColor: '#546e7a',
          backgroundColor: 'rgba(84, 110, 122, 0.5)',
          tension: 0.3,
          borderWidth: 1,
          pointRadius: 2,
        },

        // {
        //   label: 'Aplicação de inseticida',
        //   data: [],
        //   borderColor: '#2e7d32',
        //   borderWidth: 2,
        //   borderDash: [1, 1],
        //   pointRotation: 90,
        //   pointStyle: 'line',
        //   backgroundColor: 'rgba(255, 255, 255, 0)',
        //   pointRadius: 0,

        // }
      ]
    };
  });


  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay: 100,

    interaction: {
      mode: 'nearest',
      intersect: false
    },

    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 16,
          usePointStyle: true,
          font: { size: 12 }
        }
      },
      annotation: {
        annotations: Object.fromEntries(
          APLICACOES_MOCK.map(a => [
            a.id,
            {
              type: 'line',
              xMin: new Date(a.data).getTime(),
              xMax: new Date(a.data).getTime(),
              borderColor: '#2e7d32',
              borderWidth: 2,
              borderDash: [4, 4],

              label: {
                display: true,
                content: `Aplicação`,
                position: 'end',
                rotation: 270,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                color: '#2e7d32',
                borderWidth: 0.5,
                borderColor: '#2e7d32',
                borderRadius: 6,
                font: {
                  size: 12
                },
                padding: 5
              }
            }
          ])
        )
      }
    },

    scales: {
      x: {
        type: 'time',
        adapters: {
          date: {
            locale: ptBR
          }
        },
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM yyyy'
          }
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 6,
          font: { size: 11 }
        },
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      },
      y: {
        ticks: {
          font: { size: 11 }
        },
        grid: {
          color: 'rgba(0,0,0,0.08)'
        }
      }
    }
  };




}

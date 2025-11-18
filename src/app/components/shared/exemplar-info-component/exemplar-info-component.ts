
import { Component, Inject, signal, effect, OnInit, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import Chart from 'chart.js/auto';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exemplar-info-component',
  imports: [MatSelectModule, MatButtonModule, MatIconModule, NgFor, NgIf, NgOptimizedImage, DatePipe, NgbCarouselModule],
  templateUrl: './exemplar-info-component.html',
  styleUrl: './exemplar-info-component.css',
})
export class ExemplarInfoComponent implements AfterViewInit {
  showHistory = signal(true);
  showPhotos = signal(false);

  selectedHistoryField = signal('dap');
  selectedAvaliacao = signal<any>(null);
  chart: Chart | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ExemplarInfoComponent>
  ) {
    const last = data.avaliacoes[data.avaliacoes.length - 1];
    this.selectedAvaliacao.set(last);

    effect(() => {
      if (this.selectedHistoryField()) {
        setTimeout(() => this.renderChart(), 200);
      }
    });

    effect(() => {
      if (this.showHistory()) {
        setTimeout(() => this.updateChart(), 100);
      }
    });
  }


  ngAfterViewInit() {
    this.setSelectedHistoryField('dap')
  }

  setSelectedAvaliacao(av: any) {
    this.selectedAvaliacao.set(av);
  }

  setSelectedHistoryField(field: string) {
    this.selectedHistoryField.set(field);
    this.updateChart();
  }


  toggleHistory() {
    this.showHistory.set(!this.showHistory());
  }


  togglePhotos() {
    this.showPhotos.set(!this.showPhotos());
  }


  close() {
    this.dialogRef.close();
  }

  booleanFields = ['pragas', 'fungos', 'bacterias', 'def_nutricional'];
  renderChart() {
    const ctx = document.getElementById('historicChart') as HTMLCanvasElement;
    if (!ctx) return;

    const field = this.selectedHistoryField();
    const isBoolean = this.booleanFields.includes(field);

    const labels = this.data.avaliacoes.map((a: any) =>
      new Date(a.data).toLocaleDateString()
    );

    // Valores e tooltips
    const values = this.data.avaliacoes.map((a: any) =>
      isBoolean ? (a[field].sim ? 1 : 0) : a[field]
    );

    const descriptions = this.data.avaliacoes.map((a: any) =>
      isBoolean ? (a[field].sim ? a[field].desc : 'Não') : ''
    );

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(ctx, {
      type: isBoolean ? 'scatter' : 'line',
      data: {
        labels,
        datasets: [
          {
            label: field,
            data: values.map((v: number, i: number) => ({ x: i, y: v })), // scatter precisa de x/y
            borderWidth: isBoolean ? 0 : 3,
            pointRadius: isBoolean ? 8 : 5,
            pointBackgroundColor: isBoolean
              ? (ctx) => ((ctx.raw as any).y === 1 ? '#e53935' : '#43a047')
              : '#1976d2',
            showLine: !isBoolean,
            tension: isBoolean ? 0 : 0.3,
          },
        ],
      },

      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const idx = tooltipItem.dataIndex;
                if (isBoolean) {
                  return values[idx] === 1
                    ? `Sim — ${descriptions[idx]}`
                    : 'Não';
                } else {
                  return `${values[idx]}`;
                }
              },
            },
          },
        },

        scales: isBoolean
          ? {
            x: {
              ticks: {
                callback: (i) => labels[i],
              },
            },
            y: {
              min: -0.2,
              max: 1.2,
              ticks: {
                callback: (v) => (v === 1 ? 'Sim' : v === 0 ? 'Não' : ''),
              },
            },
          }
          : {
            y: { beginAtZero: true },
          },
      },
    });
  }


  updateChart() {
    if (!this.chart) return;
    const field = this.selectedHistoryField();
    const values = this.data.avaliacoes.map((a: any) => {
      if (this.booleanFields.includes(field)) {
        return a[field].sim ? 1 : 0;
      }
      return a[field];
    });
    this.chart.data.datasets[0].data = values;
    this.chart.update();
  }

}

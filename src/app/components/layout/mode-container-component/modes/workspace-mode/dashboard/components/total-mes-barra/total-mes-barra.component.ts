import {
    AfterViewInit,
    Component,
    ViewChild,
    HostListener,
    inject,
    signal,
    computed,
    effect
} from '@angular/core';

import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ProjectContextService } from '../../../../../../../../services/project-context.service';
import { MatCardModule } from '@angular/material/card';
import { MosquitosAgrupados } from '../../models/KPI-model';
import { ptBR } from 'date-fns/locale';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiConnectionService } from '../../../../../../../../services/api-connection-service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PeriodControlComponent } from '../shared/period-control/period-control.component';
import { PeriodInterval } from '../../models/period-interval-model';

@Component({
    selector: 'app-total-mes-barra',
    standalone: true,
    imports: [BaseChartDirective, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, PeriodControlComponent],
    templateUrl: './total-mes-barra.component.html',
    styleUrl: './total-mes-barra.component.css'
})
export class TotalMesBarraComponent implements AfterViewInit {

    @ViewChild(BaseChartDirective)
    chart?: BaseChartDirective;


    @HostListener('window:resize')
    onResize() {
        this.chart?.chart?.resize();
    }

    periodo = signal<PeriodInterval>({})
    periodoLabel = signal<string>('')
    data = signal<MosquitosAgrupados[]>([]);

    datasetVisibility = signal<Record<string, boolean>>({})

    private projectContext = inject(ProjectContextService);
    private apiConnection = inject(ApiConnectionService);
    selectedProject = this.projectContext.selected;

    titulo = computed(() => {

        const visibilidade = this.datasetVisibility()
        console.log(visibilidade)
        const visiveis = Object.keys(visibilidade).sort().filter(d => visibilidade[d] !== false)
        console.log(visiveis)


        const periodo = this.periodo()

        const inicio = periodo?.inicio
        const fim = periodo?.fim


        if (visiveis.length === 0)
            return `Sem dados`

        if (visiveis.length === 1)
            return `${visiveis[0]}`

        if (visiveis.length === 2)
            return `${visiveis[0]} e ${visiveis[1]}`

        if (visiveis.length >= 3)
            return `${visiveis.slice(undefined, -2).join(', ')} e ${visiveis.slice(-2, undefined).join(' e ')}`

        return `${visiveis.join(', ')}`

    })

    ngAfterViewInit() {
        setTimeout(() => {
            this.chart?.chart?.resize();
        }, 0);

        var datasetVisibleInit: Record<string, boolean> = {}
        this.chart?.chart?.data.datasets.forEach((d, i) => {
            datasetVisibleInit[d.label!] = this.chart!.chart!.isDatasetVisible(i)
        })
        this.datasetVisibility.set(datasetVisibleInit);
    }

    constructor() {
        effect(() => {

            const project = this.selectedProject();
            const p = this.periodo()
            if (project) {
                this.loadData();
            }
        });
    }


    loadData() {

        this.apiConnection
            .getMosquitosPorMes(this.selectedProject()?.id!, this.periodo().inicio, this.periodo().fim)
            .subscribe(result => {
                this.data.set(result);

            });
    }


    onPeriodoChange(periodo: { period: PeriodInterval, periodLabel?: string }) {
        this.periodo.set(periodo.period)
        this.periodoLabel.set(periodo.periodLabel!)
    }

    showDoughnut = false
    toggleDoughnut() {
        this.showDoughnut = !this.showDoughnut
    }


    // =============================
    // BAR CHART
    // =============================

    chartData = computed<ChartConfiguration<'bar'>['data']>(() => {

        const data = this.data();
        const visibilidade = this.datasetVisibility()

        return {
            labels: data.map(d => d.timestamp),

            datasets: [

                {
                    label: 'Aedes',
                    data: data.map(d => d.aedes),
                    backgroundColor: '#d84315',
                    borderRadius: 4,
                    hidden: visibilidade['Aedes'] == false
                },

                {
                    label: 'Culex',
                    data: data.map(d => d.culex),
                    backgroundColor: '#fbc02d',
                    borderRadius: 4,
                    hidden: visibilidade['Culex'] == false
                },

                {
                    label: 'Outras Espécies',
                    data: data.map(d => d.outras),
                    backgroundColor: '#d7c8ad',
                    borderRadius: 4,
                    hidden: visibilidade['Outras Espécies'] == false
                }

            ]
        };
    });

    chartOptions: ChartConfiguration['options'] = {

        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            tooltip: {
                callbacks: {
                    title: (items) => {
                        const date = new Date(items[0].parsed.x!);
                        return date.toLocaleDateString('pt-BR', {
                            month: 'long',
                            year: 'numeric'
                        });
                    }
                }
            },

            datalabels: {
                anchor: 'end',
                align: 'top',
                padding: 1,

                color: '#444',

                font: {
                    weight: 'bold',
                    size: 12
                },

                formatter: (value: number) => {
                    return value;
                }

            },
            legend: {
                onClick: (e, legendItem, legend) => {

                    const chart = legend.chart
                    const index = legendItem.datasetIndex!

                    // const ci = legend.chart;
                    if (chart.isDatasetVisible(index)) {
                        chart.hide(index);
                        legendItem.hidden = true;
                    } else {
                        chart.show(index);
                        legendItem.hidden = false;
                    }
                    // legend.chart.toggleDataVisibility(index)
                    // legend.chart.update()

                    const label = chart.data.datasets[index].label!
                    const current = { ...this.datasetVisibility() }
                    current[label] = chart.isDatasetVisible(index)
                    this.datasetVisibility.set(current)

                },
                position: 'bottom',
                labels: {
                    boxWidth: 10,
                    padding: 12,
                    usePointStyle: true
                }
            },


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
                bounds: 'data',
                offset: true,

                ticks: {
                    source: 'data',
                    includeBounds: true,
                    autoSkip: false,
                    // maxTicksLimit: 6,
                    font: { size: 11 }
                },
                grid: {
                    color: 'rgba(0,0,0,0.05)',
                    lineWidth: 1,
                }
            },
            y: {
                offset: true,
                ticks: {
                    maxTicksLimit: 5,
                    font: { size: 11 }
                },
                border: { display: false },

                grid: {

                    color: 'rgba(80, 80, 80, 0.05)',
                    lineWidth: 2,
                    tickBorderDash: [1, 10]
                }
            }
        }

    };

    doughnutData = computed<ChartConfiguration<'doughnut'>['data']>(() => {

        const data = this.data();
        const visibilidade = this.datasetVisibility();

        const totalAedes = visibilidade['Aedes'] === false
            ? 0
            : data.reduce((s, i) => s + +i.aedes, 0);

        const totalCulex = visibilidade['Culex'] === false
            ? 0
            : data.reduce((s, i) => s + +i.culex, 0);

        const totalOutras = visibilidade['Outras Espécies'] === false
            ? 0
            : data.reduce((s, i) => s + +i.outras, 0);

        return {

            labels: ['Aedes', 'Culex', 'Outras Espécies'],

            datasets: [
                {
                    data: [totalAedes, totalCulex, totalOutras],
                    backgroundColor: [
                        '#d84315',
                        '#fbc02d',
                        '#d7c8ad'
                    ],
                    borderWidth: 0
                }
            ]
        };
    });

    doughnutOptions: ChartConfiguration<'doughnut'>['options'] = {

        responsive: true,
        maintainAspectRatio: false,

        layout: {
            padding: {
                top: 40,
                bottom: 40,
                left: 40,
                right: 40
            }
        },

        plugins: {

            legend: {
                display: false
            },

            tooltip: {
                callbacks: {
                    label: (ctx) => {

                        const dataset = ctx.dataset.data as number[]
                        const total = dataset.reduce((a, b) => a + b, 0)

                        const value = ctx.parsed
                        const percent = total ? (value / total) * 100 : 0

                        return `${ctx.label}: ${percent.toFixed(1)}%`
                    }
                }
            },

            datalabels: {

                anchor: 'end',
                align: 'end',

                offset: 10,

                color: '#444',

                font: {
                    weight: 'bold',
                    size: 11
                },

                formatter: (value: number, ctx) => {

                    const dataset = ctx.dataset.data as number[]
                    const total = dataset.reduce((a, b) => a + b, 0)

                    if (!value || !total) return ''

                    const percent = (value / total) * 100

                    return `${percent.toFixed(1)}%`
                },

                clamp: true,
                clip: false

            }

        }

    };
}
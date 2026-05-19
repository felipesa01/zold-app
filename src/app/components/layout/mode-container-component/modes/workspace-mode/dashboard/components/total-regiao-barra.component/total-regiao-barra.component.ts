import { Component, AfterViewInit, ViewChild, HostListener, signal, inject, computed, effect } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ChartConfiguration } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { ApiConnectionService } from "../../../../../../../../services/api-connection-service";
import { ProjectContextService } from "../../../../../../../../services/project-context.service";
import { PeriodInterval } from "../../models/period-interval-model";
import { PeriodControlComponent } from "../shared/period-control/period-control.component";
import { MosquitosRegiao } from "../../models/KPI-model";
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-total-regiao-barra',
    standalone: true,
    imports: [
        BaseChartDirective,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        PeriodControlComponent
    ],
    templateUrl: './total-regiao-barra.component.html',
    styleUrl: './total-regiao-barra.component.css'
})
export class TotalRegiaoBarraComponent implements AfterViewInit {

    @ViewChild(BaseChartDirective)
    chart?: BaseChartDirective;

    @HostListener('window:resize')
    onResize() {
        this.chart?.chart?.resize();
    }

    periodo = signal<PeriodInterval>({})
    periodoLabel = signal<string>('')

    data = signal<MosquitosRegiao[]>([])

    datasetVisibility = signal<Record<string, boolean>>({})

    private projectContext = inject(ProjectContextService)
    private apiConnection = inject(ApiConnectionService)

    selectedProject = this.projectContext.selected

    titulo = computed(() => {

        const visibilidade = this.datasetVisibility()
        const visiveis = Object.keys(visibilidade)
            .sort()
            .filter(d => visibilidade[d] !== false)

        if (visiveis.length === 0)
            return `Sem dados`

        if (visiveis.length === 1)
            return `${visiveis[0]}`

        if (visiveis.length === 2)
            return `${visiveis[0]} e ${visiveis[1]}`

        if (visiveis.length >= 3)
            return `${visiveis.slice(0, -1).join(', ')} e ${visiveis.slice(-1)}`

        return `${visiveis.join(', ')}`
    })

    ngAfterViewInit() {

        setTimeout(() => {
            this.chart?.chart?.resize();
        }, 0)

        const datasetVisibleInit: Record<string, boolean> = {}

        this.chart?.chart?.data.datasets.forEach((d, i) => {
            datasetVisibleInit[d.label!] =
                this.chart!.chart!.isDatasetVisible(i)
        })

        this.datasetVisibility.set(datasetVisibleInit)
    }

    constructor() {

        effect(() => {

            const project = this.selectedProject()
            const p = this.periodo()

            if (project) {
                this.loadData()
            }

        })

    }

    loadData() {

        this.apiConnection
            .getMosquitosPorRegiao(
                this.selectedProject()?.id!,
                this.periodo().inicio,
                this.periodo().fim
            )
            .subscribe(result => {
                this.data.set(result)
            })
    }

    onPeriodoChange(periodo: { period: PeriodInterval, periodLabel?: string }) {

        this.periodo.set(periodo.period)
        this.periodoLabel.set(periodo.periodLabel!)
    }

    showDoughnut = false

    toggleDoughnut() {
        this.showDoughnut = !this.showDoughnut
    }

    exportar() {
        const element = document.getElementById('grafico-container-total-regiao');

        html2canvas(element!, {
            scale: 1
        }).then(canvas => {
            const url = canvas.toDataURL('image/png');

            const a = document.createElement('a');
            a.href = url;
            a.download = `total_regiao_${this.selectedProject()?.nome.toLowerCase().replaceAll(' ', '')}.png`;
            a.click();
        });
    }


    // =============================
    // BAR CHART
    // =============================

    chartData = computed<ChartConfiguration<'bar'>['data']>(() => {

        const data = this.data()
        const visibilidade = this.datasetVisibility()

        return {

            labels: data.map(d => d.regiao),

            datasets: [

                {
                    label: 'Aedes',
                    data: data.map(d => +d.aedes),
                    backgroundColor: '#d84315',
                    borderRadius: 4,
                    hidden: visibilidade['Aedes'] == false
                },

                {
                    label: 'Culex',
                    data: data.map(d => +d.culex),
                    backgroundColor: '#fbc02d',
                    borderRadius: 4,
                    hidden: visibilidade['Culex'] == false
                },

                {
                    label: 'Outras Espécies',
                    data: data.map(d => +d.outras),
                    backgroundColor: '#d7c8ad',
                    borderRadius: 4,
                    hidden: visibilidade['Outras Espécies'] == false
                }

            ]

        }

    })

    chartOptions: ChartConfiguration['options'] = {

        responsive: true,
        maintainAspectRatio: false,

        plugins: {

            datalabels: {

                anchor: 'end',
                align: 'top',

                color: '#444',

                font: {
                    weight: 'bold',
                    size: 12
                },

                formatter: (value: number) => value

            },

            legend: {

                onClick: (e, legendItem, legend) => {

                    const chart = legend.chart
                    const index = legendItem.datasetIndex!

                    if (chart.isDatasetVisible(index)) {
                        chart.hide(index)
                        legendItem.hidden = true
                    } else {
                        chart.show(index)
                        legendItem.hidden = false
                    }

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

            }

        },

        scales: {

            x: {

                type: 'category',

                ticks: {
                    font: {
                        size: 12,
                        weight: 'bold'
                    }
                },

                grid: {
                    display: false
                }

            },

            y: {

                offset: true,

                ticks: {
                    maxTicksLimit: 5,
                    font: { size: 11, }
                },

                border: { display: false },

                grid: {
                    color: 'rgba(80,80,80,0.05)',
                    lineWidth: 2,
                    tickBorderDash: [1, 10]
                }

            }

        }

    }

    // =============================
    // DOUGHNUT
    // =============================

    doughnutData = computed<ChartConfiguration<'doughnut'>['data']>(() => {

        const data = this.data();
        const visibilidade = this.datasetVisibility()

        const totals = data.map(d =>
            (visibilidade['Aedes'] !== false ? +d.aedes : 0) +
            (visibilidade['Culex'] !== false ? +d.culex : 0) +
            (visibilidade['Outras Espécies'] !== false ? +d.outras : 0)
        );

        const colors = [
            '#344955',
            '#5f7d8c',
            '#8e5a7d',
            '#6c3483',
            '#7fb3d5',
            '#8e0038',
            '#95a5a6',
            '#ff69b4',
            '#17a589',
            '#a569bd',
            '#344955',
            '#5f7d8c',
            '#8e5a7d',
            '#6c3483',
            '#7fb3d5',
            '#8e0038',
            '#95a5a6',
            '#ff69b4',
            '#17a589',
            '#a569bd',
            '#344955',
            '#5f7d8c',
            '#8e5a7d',
            '#6c3483',
            '#7fb3d5',
            '#8e0038',
            '#95a5a6',
            '#ff69b4',
            '#17a589',
            '#a569bd'
        ];

        return {

            labels: data.map(d => d.regiao),

            datasets: [
                {
                    data: totals,
                    backgroundColor: data.map((_, i) => colors[i % colors.length]),
                    borderWidth: 0,
                    cutout: '60%'   // donut mais fino
                }
            ]

        }

    });

    doughnutOptions: ChartConfiguration<'doughnut'>['options'] = {

        responsive: true,
        maintainAspectRatio: false,

        layout: {
            padding: 60
        },

        plugins: {

            legend: {
                display: false
            },

            tooltip: {

                callbacks: {

                    label: (ctx) => {

                        const dataset = ctx.dataset.data as number[];

                        const total = dataset.reduce((a, b) => a + b, 0);

                        const value = ctx.parsed;

                        const percent = total
                            ? (value / total) * 100
                            : 0;

                        return `${ctx.label}: ${percent.toFixed(1)}%`;
                    }

                }

            },

            datalabels: {

                anchor: 'end',
                align: 'end',

                offset: 14,

                color: '#5c6b73',

                font: {
                    weight: 'bold',
                    size: 12
                },

                formatter: (value: number, ctx) => {

                    const dataset = ctx.dataset.data as number[];

                    const total = dataset.reduce((a, b) => a + b, 0);

                    if (!value || !total) return '';

                    const percent = (value / total) * 100;

                    const label = ctx.chart.data.labels?.[ctx.dataIndex];

                    return `${label} ${percent.toFixed(1)}%`;

                },

                clamp: true,
                clip: false

            }

        }

    };

}
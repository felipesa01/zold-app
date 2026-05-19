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
import { MosquitosAgrupados } from "../../models/KPI-model";
import { PeriodInterval } from "../../models/period-interval-model";
import { PeriodControlComponent } from "../shared/period-control/period-control.component";
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-evolucao-monitoramento-linha',
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
    templateUrl: './evolucao-monitoramento-linha.component.html',
    styleUrl: './evolucao-monitoramento-linha.component.css'
})
export class EvolucaoMonitoramentoLinhaComponent implements AfterViewInit {

    @ViewChild(BaseChartDirective)
    chart?: BaseChartDirective;

    @HostListener('window:resize')
    onResize() {
        this.chart?.chart?.resize();
    }

    periodo = signal<PeriodInterval>({})
    periodoLabel = signal<string>('')
    data = signal<MosquitosAgrupados[]>([])

    datasetVisibility = signal<Record<string, boolean>>({})

    private projectContext = inject(ProjectContextService)
    private apiConnection = inject(ApiConnectionService)

    selectedProject = this.projectContext.selected

    titulo = computed(() => {

        const visibilidade = this.datasetVisibility()

        const visiveis = Object
            .keys(visibilidade)
            .sort()
            .filter(d => visibilidade[d] !== false)

        if (visiveis.length === 0) return `Sem dados`
        if (visiveis.length === 1) return `${visiveis[0]}`
        if (visiveis.length === 2) return `${visiveis[0]} e ${visiveis[1]}`

        return `${visiveis.slice(0, -2).join(', ')} e ${visiveis.slice(-2).join(' e ')}`
    })

    constructor() {

        effect(() => {

            const project = this.selectedProject()
            const p = this.periodo()

            if (project)
                this.loadData()

        })

    }

    ngAfterViewInit() {

        setTimeout(() => {
            this.chart?.chart?.resize()
        }, 0)

        const datasetVisibleInit: Record<string, boolean> = {}

        this.chart?.chart?.data.datasets.forEach((d, i) => {
            datasetVisibleInit[d.label!] = this.chart!.chart!.isDatasetVisible(i)
        })

        this.datasetVisibility.set(datasetVisibleInit)

    }

    loadData() {

        this.apiConnection
            .getMosquitosPorMonitoramento(
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
        const element = document.getElementById('grafico-container-evolucao-monit');

        html2canvas(element!, {
            scale: 1
        }).then(canvas => {
            const url = canvas.toDataURL('image/png');

            const a = document.createElement('a');
            a.href = url;
            a.download = `evolucao_monit_${this.selectedProject()?.nome.toLowerCase().replaceAll(' ', '')}.png`;
            a.click();
        });
    }


    // =============================
    // LINE CHART
    // =============================

    chartData = computed<ChartConfiguration<'line'>['data']>(() => {

        const data = this.data()
        const visibilidade = this.datasetVisibility()

        return {

            labels: data.map(d => d.timestamp),

            datasets: [

                {
                    label: 'Aedes',
                    data: data.map(d => d.aedes),
                    borderColor: '#d84315',
                    backgroundColor: '#d84315',
                    // tension: 0.3,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    fill: false,
                    hidden: visibilidade['Aedes'] == false
                },

                {
                    label: 'Culex',
                    data: data.map(d => d.culex),
                    borderColor: '#fbc02d',
                    backgroundColor: '#fbc02d',
                    // tension: 0.3,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    fill: false,
                    hidden: visibilidade['Culex'] == false
                },

                {
                    label: 'Outras Espécies',
                    data: data.map(d => d.outras),
                    borderColor: '#d7c8ad',
                    backgroundColor: '#d7c8ad',
                    // tension: 0.3,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    fill: false,
                    hidden: visibilidade['Outras Espécies'] == false
                }

            ]

        }

    })

    // =============================
    // MONTH PLUGIN (igual)
    // =============================

    monthBandsPlugin = {
        id: 'monthBands',

        afterDraw: (chart: any) => {

            const { ctx, chartArea, scales: { x } } = chart
            const data = this.data()

            if (!data.length) return

            const step = x.getPixelForValue(1) - x.getPixelForValue(0)

            const months: { month: string, start: number, end: number }[] = []

            data.forEach((d, i) => {

                const date = new Date(d.timestamp)

                const month = date.toLocaleDateString('pt-BR', {
                    month: 'short',
                    year: 'numeric',
                    timeZone: 'UTC'
                }).replace('. de', '')

                const last = months[months.length - 1]

                if (!last || last.month !== month)
                    months.push({ month, start: i, end: i })
                else
                    last.end = i

            })

            ctx.save()

            ctx.textAlign = 'center'
            ctx.fillStyle = '#666'
            ctx.font = '11px sans-serif'

            months.forEach((m, i) => {

                const startPixel = x.getPixelForValue(m.start) - step / 2
                const endPixel = x.getPixelForValue(m.end) + step / 2

                const mid = (startPixel + endPixel) / 2

                ctx.fillText(
                    m.month,
                    mid,
                    chartArea.bottom + 35
                )

                if (i > 0) {

                    ctx.beginPath()
                    ctx.strokeStyle = 'rgba(0,0,0,0.3)'
                    ctx.lineWidth = 1

                    ctx.moveTo(startPixel, chartArea.top)
                    ctx.lineTo(startPixel, chartArea.bottom)

                    ctx.stroke()

                }

            })

            ctx.restore()

        }
    }

    chartOptions: ChartConfiguration<'line'>['options'] = {

        responsive: true,
        maintainAspectRatio: false,

        layout: {
            padding: {
                bottom: 35
            }
        },

        plugins: {

            tooltip: {
                callbacks: {
                    title: (items) => {

                        const date = new Date(items[0].label!)

                        return date.toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        })

                    }
                }
            },

            datalabels: {
                anchor: (ctx) => {

                    const label = ctx.dataset.label

                    if (label === 'Culex')
                        return 'end'

                    return 'end'
                },

                align: (ctx) => {

                    const label = ctx.dataset.label

                    if (label === 'Culex')
                        return 'bottom'

                    return 'top'
                },

                offset: (ctx) => {

                    const label = ctx.dataset.label

                    if (label === 'Outras Espécies')
                        return 12

                    if (label === 'Culex')
                        return 8

                    return 6
                },
                padding: 1,
                clip: false,
                clamp: true,

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

                position: 'bottom',

                labels: {
                    boxWidth: 10,
                    padding: 20,
                    usePointStyle: true
                },

                onClick: (e, legendItem, legend) => {

                    const chart = legend.chart
                    const index = legendItem.datasetIndex!

                    if (chart.isDatasetVisible(index)) {
                        chart.hide(index)
                        legendItem.hidden = true
                    }
                    else {
                        chart.show(index)
                        legendItem.hidden = false
                    }

                    const label = chart.data.datasets[index].label!

                    const current = { ...this.datasetVisibility() }

                    current[label] = chart.isDatasetVisible(index)

                    this.datasetVisibility.set(current)

                }

            }

        },

        scales: {

            x: {

                type: 'category',

                ticks: {

                    autoSkip: false,

                    callback: (value, index) => {

                        const date = new Date(this.data()[index].timestamp)

                        return date.getUTCDate().toString()

                    }

                },

                grid: {
                    color: 'rgba(0,0,0,0.05)'
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

                    color: 'rgba(80,80,80,0.05)',
                    lineWidth: 2,
                    tickBorderDash: [1, 10]

                }

            }

        }

    }

    // =============================
    // DOUGHNUT (igual)
    // =============================

    doughnutData = computed<ChartConfiguration<'doughnut'>['data']>(() => {

        const data = this.data()
        const visibilidade = this.datasetVisibility()

        const totalAedes = visibilidade['Aedes'] === false
            ? 0
            : data.reduce((s, i) => s + +i.aedes, 0)

        const totalCulex = visibilidade['Culex'] === false
            ? 0
            : data.reduce((s, i) => s + +i.culex, 0)

        const totalOutras = visibilidade['Outras Espécies'] === false
            ? 0
            : data.reduce((s, i) => s + +i.outras, 0)

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
        }

    })

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
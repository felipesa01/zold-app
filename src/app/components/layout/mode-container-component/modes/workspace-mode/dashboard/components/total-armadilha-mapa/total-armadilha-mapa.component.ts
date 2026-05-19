import {
    AfterViewInit,
    Component,
    ViewChild,
    HostListener,
    inject,
    signal,
    computed,
    effect,
    NgZone,
    ElementRef
} from '@angular/core';
import { ptBR } from 'date-fns/locale';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { PeriodControlComponent } from '../shared/period-control/period-control.component';
import { PeriodInterval } from '../../models/period-interval-model';
import { ApiConnectionService } from '../../../../../../../../services/api-connection-service';
import { ProjectContextService } from '../../../../../../../../services/project-context.service';
import { MosquitosArmadilha } from '../../models/KPI-model';
import { Armadilha } from '../../../mosquitos/armadilhas/armadilha.model';
import { Feature, Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import { Fill, Stroke } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Text from 'ol/style/Text';
import { defaults as defaultControls } from 'ol/control';
import { defaults as defaultInteractions } from 'ol/interaction';
import { XYZ } from 'ol/source';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import OsmSource from 'ol/source/OSM';


@Component({
    selector: 'app-total-armadilha-mapa',
    standalone: true,
    imports: [CommonModule, BaseChartDirective, PeriodControlComponent],
    templateUrl: './total-armadilha-mapa.component.html',
    styleUrl: './total-armadilha-mapa.component.css'
})
export class TotalArmadilhaMapaComponent implements AfterViewInit {

    @ViewChild(BaseChartDirective)
    chart?: BaseChartDirective;

    @ViewChild('mapElement') mapElement!: ElementRef<HTMLDivElement>;


    @HostListener('window:resize')
    onResize() {
        this.chart?.chart?.resize();
    }

    periodo = signal<PeriodInterval>({})
    periodoLabel = signal<string>('')
    data = signal<MosquitosArmadilha[]>([]);
    // private armadilhas = signal<Armadilha[]>([]);

    pageSize = 10

    pagina = signal(0)

    totalPaginas = computed(() => {
        var data;
        if (this.regiao()) { data = this.data().filter(e => e.a_regiao == this.regiao()) }
        else { data = this.data() }

        return Math.ceil(data.length / this.pageSize)
    })

    armadilhasPagina = computed(() => {
        var data;
        if (this.regiao()) { data = this.data().filter(e => e.a_regiao == this.regiao()) }
        else { data = this.data() }

        const start = this.pagina() * this.pageSize
        const end = start + this.pageSize

        // return data.slice(start, end)
        return data

    })

    regiaoOptions = computed(() => {
        const data = this.data();
        const values = data.map(c => c.a_regiao);
        return [...new Set(values)];
    });
    regiao = signal<string | null>(null);

    onRegiao(event: Event) {
        this.pagina.set(0)
        const value = (event.target as HTMLSelectElement).value;
        this.regiao.set(value || null);
    }

    private zone = inject(NgZone)
    map = signal<Map | null>(null);


    datasetVisibility = signal<Record<string, boolean>>({})

    private projectContext = inject(ProjectContextService);
    private apiConnection = inject(ApiConnectionService);
    selectedProject = this.projectContext.selected;


    filtered = computed(() => {
        const armadilhasPagina = this.armadilhasPagina()
        const nomesPagina = new Set(armadilhasPagina.map(a => a.armadilha))
        const data = this.data()
        return data.filter(d => nomesPagina.has(d.armadilha))
    })

    legendItems = [
        { label: 'Aedes', color: '#d84315' },
        { label: 'Culex', color: '#fbc02d' },
        { label: 'Outras Espécies', color: '#d7c8ad' }
    ];

    toggleDataset(label: string) {
        const current = { ...this.datasetVisibility() };
        current[label] = current[label] === false ? true : false;
        this.datasetVisibility.set(current);
    }

    private readonly RADIUS_MIN = 6;
    private readonly RADIUS_MAX = 30;

    range = computed(() => {
        const data = this.data();
        const vis = this.datasetVisibility();

        const valores: number[] = [];

        data.forEach(d => {

            if (vis['Aedes'] !== false && d.aedes > 0) {
                valores.push(+d.aedes);
            }

            if (vis['Culex'] !== false && d.culex > 0) {
                valores.push(+d.culex);
            }

            if (vis['Outras Espécies'] !== false && d.outras > 0) {
                valores.push(+d.outras);
            }

        });

        if (!valores.length) {
            return { min: 0, max: 1 };
        }

        return {
            min: Math.min(...valores),
            max: Math.max(...valores)
        };
    });

    normalize(value: number): number {
        const { min, max } = this.range();

        if (max === min) return this.RADIUS_MIN;

        let t = (value - min) / (max - min);

        const gamma = 2; // ajuste: 1.5 → leve | 2 → médio | 3 → forte
        t = Math.pow(t, gamma);

        return this.RADIUS_MIN + t * (this.RADIUS_MAX - this.RADIUS_MIN);
    }

    sizeLegend = computed(() => {
        const { min, max } = this.range();

        const mid = (min + max) / 2;

        return [
            { label: Math.round(min), value: min },
            { label: Math.round(mid), value: mid },
            { label: Math.round(max), value: max }
        ];
    });

    titulo = computed(() => {

        const visibilidade = this.datasetVisibility()
        const visiveis = Object.keys(visibilidade).sort().filter(d => visibilidade[d] !== false)

        const periodo = this.periodo()

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

        var datasetVisibleInit: Record<string, boolean> = {'Aedes': true, 'Culex': true, 'Outras Espécies': true}
        this.datasetVisibility.set(datasetVisibleInit);


        const mapInstance = new Map({
            moveTolerance: 3,
            interactions: defaultInteractions(undefined),
            layers: [
                // new TileLayer({
                //     source: new XYZ({
                //         url: 'https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}',
                //         attributions: '© Google'
                //     })
                // }),
                new TileLayer({
                    source: new XYZ({
                        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                        crossOrigin: 'anonymous'
                    })
                }),
                // new TileLayer(
                //     { source: new OsmSource(), properties: { name: 'OSM', imgThumb: '.assets/images/tileThumbs/osm.png', categoria: 'OSM' } }
                // ),
                this.armadilhaLayer
            ],
            view: new View({
                projection: 'EPSG:4326',
                center: [-46.9212, -23.448],
                zoom: 10,
            }),
            controls: defaultControls({ attribution: false, zoom: false, rotate: false }),
        });
        mapInstance.setTarget(this.mapElement.nativeElement);
        this.map.set(mapInstance);
        setTimeout(() => mapInstance.updateSize());
    }

    constructor() {

        effect(() => {
            this.selectedProject();
            this.pagina.set(0);
            this.regiao.set(null)
        })

        effect(() => {

            this.selectedProject();
            const map = this.map();
            const armadilhas = this.armadilhasPagina();

            if (!map) return;

            this.armadilhaSource.clear();
            if (!armadilhas.length) return;
            const features = armadilhas.map(a => {
                const feature = new Feature({
                    geometry: new Point([a.a_lon, a.a_lat])
                });
                feature.set('armadilhaId', a.a_id);
                feature.set('nome', a.armadilha);
                return feature;
            });
            this.armadilhaSource.addFeatures(features);

            map.getView().fit(
                this.armadilhaSource.getExtent(),
                { padding: [100, 100, 100, 100], maxZoom: 18 }
            );

        })
        effect(() => {

            const project = this.selectedProject();
            const p = this.periodo()
            if (project) {
                this.loadData();
            }

            const map = this.map();
            if (!map) return;
            this.zone.onStable.subscribe(() => {
                if (!this.mapElement) return;
                map.setTarget(this.mapElement.nativeElement);
                map.updateSize();
            });

        });

        effect(() => {
            this.range();
            this.datasetVisibility()
            this.armadilhaLayer.changed();
        });


    }

    private armadilhaSource = new VectorSource();
    private armadilhaLayer = new VectorLayer({
        source: this.armadilhaSource,
        style: (feature, resolution) => {

            const id = feature.get('armadilhaId');
            const nome = feature.get('nome');

            const data = this.data().filter(d => d.a_id === id);
            const vis = this.datasetVisibility();

            const soma = (tipo: 'aedes' | 'culex' | 'outras') =>
                data.reduce((s, i) => s + i[tipo], 0);

            const styles: Style[] = [];

            const tipos = [
                { key: 'Aedes', valor: soma('aedes'), color: '#d82215ff', dx: 0 },
                { key: 'Culex', valor: soma('culex'), color: '#fbc02d', dx: 0.00005 },
                { key: 'Outras Espécies', valor: soma('outras'), color: '#d7c8ad', dx: -0.00005 }
            ];

            tipos.forEach(t => {
                if (vis[t.key] === false || t.valor <= 0) return;

                const geom = feature.getGeometry()?.clone() as Point
                styles.push(new Style({
                    geometry: geom?.translate(t.dx, 0)!,
                    image: new Circle({
                        radius: this.normalize(t.valor),
                        fill: undefined,
                        stroke: new Stroke({
                            color: t.color,
                            width: 3
                        })
                    })
                }));
            });

            if (resolution < 0.00002) {
                styles.push(new Style({
                    text: new Text({
                        text: nome,
                        font: '10px Inter',
                        fill: new Fill({ color: '#111' }),
                        stroke: new Stroke({ color: '#fff', width: 3 })
                    })
                }));
            }

            return styles;
        },
        zIndex: 9999
    });


    loadData() {
        this.pagina.set(0);

        this.apiConnection
            .getMosquitosPorArmadilhas(this.selectedProject()?.id!, this.periodo().inicio, this.periodo().fim)
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

    proximaPagina() {

        if (this.pagina() < this.totalPaginas() - 1)
            this.pagina.update(p => p + 1)

    }

    paginaAnterior() {

        if (this.pagina() > 0)
            this.pagina.update(p => p - 1)

    }


    exportar() {
        const element = document.getElementById('grafico-container-armadilha-mapa-c');

        html2canvas(element!, {
            scale: 1
        }).then(canvas => {
            const url = canvas.toDataURL('image/png');

            const a = document.createElement('a');
            a.href = url;
            a.download = `armadilha_mapa_c_${this.selectedProject()?.nome.toLowerCase().replaceAll(' ', '')}.png`;
            a.click();
        });
    }


    // =============================
    // BAR CHART
    // =============================

    chartData = computed<ChartConfiguration<'bar'>['data']>(() => {

        const data = this.filtered();
        const visibilidade = this.datasetVisibility()
        const armadilhas = this.armadilhasPagina()

        function soma(tipo: 'aedes' | 'culex' | 'outras', armadilhaNome: string) {
            return data
                .filter(d => d.armadilha === armadilhaNome)
                .reduce((s, i) => s + i[tipo], 0)
        }

        return {
            labels: this.armadilhasPagina().map(a => a.armadilha),

            datasets: [

                {
                    label: 'Aedes',
                    data: [],
                    backgroundColor: '#d84315',
                    // borderRadius: 4,
                    // barThickness: 15,
                    hidden: visibilidade['Aedes'] == false
                },

                {
                    label: 'Culex',
                    data: [],
                    backgroundColor: '#fbc02d',
                    borderRadius: 4,
                    // barThickness: 15,
                    // barThickness: 'flex',
                    hidden: visibilidade['Culex'] == false
                },

                {
                    label: 'Outras Espécies',
                    data: [],
                    backgroundColor: '#d7c8ad',
                    borderRadius: 4,
                    // barThickness: 15,
                    // barThickness: 'flex',
                    hidden: visibilidade['Outras Espécies'] == false
                }

            ]
        };
    });

    chartOptions: ChartConfiguration['options'] = {

        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',

        plugins: {

            tooltip: { enabled: true },
            datalabels: {
                anchor: 'end',
                align: 'right',
                padding: 1,
                color: '#444',
                font: {
                    weight: 'bold',
                    size: 11
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
                beginAtZero: true,
                ticks: {
                    precision: 0,
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
                    display: false
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
import { AfterViewInit, Component, computed, inject, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartType, ChartConfiguration, ChartDataset } from 'chart.js';
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
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Feature, Map, View } from 'ol';
import { defaults as defaultInteractions, Draw, PinchZoom } from 'ol/interaction';
import { defaults as defaultControls, ScaleLine } from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import OsmSource from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle, Fill, Stroke, Style } from 'ol/style';
import { Point } from 'ol/geom';
import { XYZ } from 'ol/source';

@Component({
  selector: 'app-armadilhas-detail',
  imports: [CommonModule, BaseChartDirective, MatButtonModule, MatIconModule, FormsModule, MatCheckboxModule],
  templateUrl: './armadilhas-detail.html',
  styleUrl: './armadilhas-detail.css',
})




export class ArmadilhasDetail implements AfterViewInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  showRefil = signal(true);
  showAtrativo = signal(true);

  @ViewChild(BaseChartDirective)
  chart?: BaseChartDirective;

  resetZoom() {
    this.chart?.chart?.resetZoom();
  }

  map: Map = new Map({
    moveTolerance: 3,
    interactions: defaultInteractions(undefined),
    layers: [new TileLayer({ source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', attributions: '© Google' }) }),],
    view: new View({
      projection: 'EPSG:4326',
      center: [-46.9212, -23.448],
      zoom: 10,
    }),
    controls: defaultControls({ attribution: false, zoom: false, rotate: false }),
  })

  constructor() { }

  ngAfterViewInit() {
    this.defineMap()
  }


  armadilhaId = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id'))
    )
  );

  armadilha = computed(() => {
    const id = this.armadilhaId();
    if (!id) return undefined;

    this.createLayer(ARMADILHAS_MOCK.find(a => a.id === id))

    return ARMADILHAS_MOCK.find(a => a.id === id);
  });

  createLayer(armadilha?: Armadilha) {
    if (!armadilha) return

    const geom = new Feature({geometry: new Point([armadilha.lon, armadilha.lat])})

    const armadilhaLayer = new VectorLayer({
      source: new VectorSource({features: [geom] }),
      style: new Style({
        image: new Circle({
          radius: 10,
          fill: new Fill({ color: 'rgba(209, 30, 48, 0.5)' }),
          stroke: new Stroke({
            color: 'red', width: 2
          })
        }),
      }),
      zIndex: 99999
    })
    this.map.addLayer(armadilhaLayer)
    this.map.getView().fit(geom.getGeometry()!, {maxZoom: 18})
  }

  capturas = computed<Captura[]>(() =>
    CAPTURAS_MOCK
      .filter(c => c.armadilhaId === this.armadilhaId())
      .sort((a, b) => a.data.localeCompare(b.data))
  );

  defineMap() {
    this.map.updateSize()
    this.map.setTarget('map-armadilha-detail')
  }


  refilDataset = computed<ChartDataset | null>(() => {
    if (!this.showRefil()) return null;

    return {
      label: 'Troca de refil',
      data: this.capturas().map(c =>
        c.trocaRefil ? c.numTotal : null
      ),
      showLine: false,
      pointRadius: 6,
      pointHoverRadius: 8,
      PointBackgroundColor: '#rgba(255, 255, 255, 0)',
      borderColor: '#d6b600ff',
      borderWidth: 3,
      borderDash: [0.3, 0.3],
    }
  });

  atrativoDataset = computed<ChartDataset | null>(() => {
    if (!this.showAtrativo()) return null;

    return {
      label: 'Troca de atrativo',
      data: this.capturas().map(c =>
        c.trocaAtrativo ? c.numTotal : null
      ),
      showLine: false,
      pointRadius: 6,
      pointHoverRadius: 8,
      PointBackgroundColor: '#rgba(255, 255, 255, 0)',
      borderColor: '#0026cfff',
      borderWidth: 3
    };
  });

  baseDataset = computed<ChartDataset[]>(() => [
    {
      label: 'Aedes',
      data: this.capturas().map(c => c.numAedes),
      borderColor: '#1e88e5',
      backgroundColor: 'rgba(30, 136, 229, 0.5)',
      tension: 0.3,
      cubicInterpolationMode: 'monotone',
      borderWidth: 1,
      pointRadius: 4,
      pointHoverRadius: 6,
      hitRadius: 8,

    },
    {
      label: 'Culex',
      data: this.capturas().map(c => c.numCulex),
      borderColor: '#8e24aa',
      backgroundColor: 'rgba(141, 36, 170, 0.5)',
      tension: 0.3,
      cubicInterpolationMode: 'monotone',
      borderWidth: 1,
      pointRadius: 4,
      pointHoverRadius: 6,
      hitRadius: 8
    },
    {
      label: 'Outras',
      data: this.capturas().map(c => c.numOutras),
      borderColor: '#546e7a',
      backgroundColor: 'rgba(84, 110, 122, 0.5)',
      tension: 0.3,
      cubicInterpolationMode: 'monotone',
      borderWidth: 1,
      pointRadius: 4,
      pointHoverRadius: 6,
      hitRadius: 8
    },
    {
      label: 'Total',
      data: this.capturas().map(c => c.numTotal),
      borderColor: '#d32f2f',
      backgroundColor: 'rgba(211, 47, 47, 0.5)',
      borderWidth: 2,
      tension: 0.3,
      cubicInterpolationMode: 'monotone',
      pointRadius: 4,
      pointHoverRadius: 6,
      hitRadius: 10,
    }
  ])

  chartType: ChartType = 'line';

  chartData = computed<ChartConfiguration['data']>(() => {
    const datasets = [...this.baseDataset()];

    if (this.refilDataset()) {
      datasets.push(this.refilDataset()!);
    }

    if (this.atrativoDataset()) {
      datasets.push(this.atrativoDataset()!);
    }

    return { labels: this.capturas().map(c => c.data), datasets }

  })


  chartOptions = computed<ChartConfiguration['options']>(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'point',
        intersect: true
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx: any) => {
              if (ctx.dataset.label === 'Troca de refil') {
                return 'Troca de refil realizada';
              }
              if (ctx.dataset.label === 'Troca de atrativo') {
                return 'Troca de atrativo realizada';
              }
              return `${ctx.dataset.label}: ${ctx.parsed.y}`;
            }
          }
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true   // zoom com scroll do mouse
            },
            pinch: {
              enabled: true   // zoom com dois dedos (touch)
            },
            mode: 'x'         // zoom apenas no eixo X (tempo)
          },
          pan: {
            enabled: true,
            mode: 'x',        // arrastar horizontal
            modifierKey: 'ctrl' // evita pan acidental
          }
        },
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 16
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Data' }
        },
        y: {
          title: { display: true, text: 'Quantidade de mosquitos' }
        }
      }
    }
  })

  goBack() {
    this.router.navigate(['/workspace/entities/armadilhas']);
  }


}

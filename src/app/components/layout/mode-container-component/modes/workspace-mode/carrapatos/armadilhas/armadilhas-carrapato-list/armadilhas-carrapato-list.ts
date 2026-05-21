import { CommonModule, Location } from "@angular/common";
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild, computed, effect, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule, Sort } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { NavigationEnd, Router } from "@angular/router";
import { ApiConnectionService } from "../../../../../../../../services/api-connection-service";
import { ProjectContextService } from "../../../../../../../../services/project-context.service";
import { ArmadilhaCarrapato } from "../armadilha-carrapato.model";
import { defaults as defaultInteractions } from 'ol/interaction';
import { defaults as defaultControls } from 'ol/control';
import { Feature, View, Map } from "ol";
import { Point } from "ol/geom";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { XYZ } from "ol/source";
import VectorSource from "ol/source/Vector";
import { Style, Fill, Stroke, Circle, Text } from "ol/style";
import { filter } from "rxjs";

@Component({
    selector: 'app-armadilhas-carrapato-list',
    standalone: true,
    imports: [
      CommonModule,
      MatButtonModule,
      MatIconModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatTabsModule,
      MatProgressSpinnerModule
    ],
    templateUrl: './armadilhas-carrapato-list.html',
    styleUrl: './armadilhas-carrapato-list.css'
  })
  export class ArmadilhasCarrapatoList implements AfterViewInit {
  private projectContext = inject(ProjectContextService);
  selectedProject = this.projectContext.selected;
  private api = inject(ApiConnectionService);

  private armadilhas = signal<ArmadilhaCarrapato[]>([]);
  private zone = inject(NgZone)

  @ViewChild('mapElement') mapElement!: ElementRef<HTMLDivElement>;

  map = signal<Map | null>(null);


  pageIndex = signal(0);
  pageSize = signal(10);
  loading = signal(false);

  // regioes = ['Centro', 'Zona Norte', 'Zona Sul', 'Zona Leste'];
  cols = ['nome', 'regiao', 'referencia'];

  filtered = computed(() => {
    return this.armadilhas().filter(a => {

      // texto
      if (this.search()) {
        const text = `${a.nome} ${a.referencia} ${a.regiao}`.toLowerCase();
        if (!text.includes(this.search())) return false;
      }

      // região
      if (this.regiao() && a.regiao !== this.regiao()) return false;

      // período
      const d = new Date(a.createdAt + 'T00:00:00');
      if (this.dataInicio() && d < this.dataInicio()!) return false;
      if (this.dataFim() && d > this.dataFim()!) return false;

      return true;
    });
  });

  sorted = computed(() => {
    const { active, direction } = this.sort();
    if (!direction) return this.filtered();

    return [...this.filtered()].sort((a, b) => {
      let v1: any;
      let v2: any;

      switch (active) {
        case 'nome':
          v1 = a.nome;
          v2 = b.nome;
          break;
        case 'regiao':
          v1 = a.regiao;
          v2 = b.regiao;
          break;
        default:
          return 0;
      }

      return direction === 'asc'
        ? v1.localeCompare(v2)
        : v2.localeCompare(v1);
    });
  });

  sort = signal<Sort>({ active: 'nome', direction: 'asc' });

  pagedData = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.sorted().slice(start, start + this.pageSize());
  });

  selectedTab = signal(0);

  constructor(private router: Router, private location: Location) {
    effect(() => {
      this.selectedProject();
      this.loadData();

      const map = this.map();
      if (!map) return;
      this.zone.onStable.subscribe(() => {
        if (!this.mapElement) return;
        map.setTarget(this.mapElement.nativeElement);
        map.updateSize();
      });
    });

    effect(() => {

      const map = this.map();
      const armadilhas = this.filtered();

      if (!map) return;

      this.armadilhaSource.clear();

      if (!armadilhas.length) return;

      const features = armadilhas.map(a => {
        const feature = new Feature({
          geometry: new Point([a.lon, a.lat])
        });

        feature.set('armadilhaId', a.id);
        feature.set('nome', a.nome);

        return feature;
      });

      this.armadilhaSource.addFeatures(features);

      map.getView().fit(
        this.armadilhaSource.getExtent()!,
        { padding: [100, 100, 100, 100], maxZoom: 18 }
      );

    });

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url.includes('/workspace/mosquitos/armadilhas-carrapatos')) {
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
  }

  private armadilhaSource = new VectorSource();
  private armadilhaLayer = new VectorLayer({
    source: this.armadilhaSource,
    style: (feature, resolution) => {

      const nome = feature.get('nome');

      const showLabel = resolution < 0.0001

      return new Style({
        image: new Circle({
          radius: 8,
          fill: new Fill({ color: 'rgba(209, 30, 48, 0.6)' }),
          stroke: new Stroke({
            color: '#ffffff',
            width: 2
          })
        }),
        text: showLabel ? new Text({
          text: nome,
          offsetY: -18,
          font: '12px Inter, Arial, sans-serif',
          fill: new Fill({ color: '#111827' }),
          stroke: new Stroke({
            color: '#ffffff',
            width: 3
          })
        }) : undefined
      });

    },
    zIndex: 99999
  });
  // private armadilhaLayer = new VectorLayer({
  //   source: this.armadilhaSource,
  //   style: new Style({
  //     image: new Circle({
  //       radius: 10,
  //       fill: new Fill({ color: 'rgba(209, 30, 48, 0.5)' }),
  //       stroke: new Stroke({
  //         color: 'red',
  //         width: 2
  //       })
  //     }),
  //   }),
  //   zIndex: 99999
  // });

  ngAfterViewInit() {


  }
  // createLayer(armadilhas?: Armadilha[]) {
  //   if (!armadilhas) return

  //   const geom = armadilhas.map(armadilha => new Feature({ geometry: new Point([armadilha.lon, armadilha.lat]) }))

  //   const armadilhaLayer = new VectorLayer({
  //     source: new VectorSource({ features: geom }),
  //     style: new Style({
  //       image: new Circle({
  //         radius: 10,
  //         fill: new Fill({ color: 'rgba(209, 30, 48, 0.5)' }),
  //         stroke: new Stroke({
  //           color: 'red', width: 2
  //         })
  //       }),
  //     }),
  //     zIndex: 99999
  //   })

  //   this.map.addLayer(armadilhaLayer)
  //   this.map.getView().fit(armadilhaLayer?.getSource()?.getExtent()!, { padding: [100, 100, 100, 100] })
  // }

  onTabChange(index: number) {

    this.selectedTab.set(index);

    if (index !== 1) return;

    // se já existe mapa, só atualiza
    const map = this.map();
    if (map) {
      setTimeout(() => {
        map.setTarget(this.mapElement.nativeElement);
        map.updateSize();
      });
      return;
    }

    // cria mapa se ainda não existe
    const mapInstance = new Map({
      moveTolerance: 3,
      interactions: defaultInteractions(undefined),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}',
            attributions: '© Google'
          })
        }),
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

    mapInstance.on('singleclick', (event) => {

      mapInstance.forEachFeatureAtPixel(event.pixel, (feature) => {

        const id = feature.get('armadilhaId');

        if (id) {
          this.router.navigate(['/workspace/mosquitos/armadilhas-carrapatos', id]);
        }

      });

    });

    mapInstance.on('pointermove', (event) => {

      const hit = mapInstance.hasFeatureAtPixel(event.pixel);

      const target = mapInstance.getTargetElement();

      if (target) {
        target.style.cursor = hit ? 'pointer' : '';
      }

    });

  }

  loadData() {
    const project = this.selectedProject();

    if (!project) {
      this.armadilhas.set([]);
      return;
    }

    this.loading.set(true);

    this.api.listarArmadilhasCarrapatosByProjeto(project.id).subscribe({
      next: data => {
        this.armadilhas.set([...data]);
        this.loading.set(false);
        // this.createLayer(this.armadilhas())
      },
      error: () => {
        this.armadilhas.set([]);
        this.loading.set(false);
      }
    });


  }

  reload() {
    this.loadData();
  }


  open(a: ArmadilhaCarrapato, e?: Event) {
    e?.stopPropagation();
    this.router.navigate(['/workspace/mosquitos/armadilhas-carrapatos', a.id]);
  }

  goBack() {
    this.router.navigate(['/workspace']);
  }

  voltar() {
    this.location.back();
  }


  search = signal('');
  regiao = signal<string | null>(null);
  referencia = signal<string | null>(null);
  dataInicio = signal<Date | null>(null);
  dataFim = signal<Date | null>(null);

  resetFilters() {
    this.search.set('');
    this.regiao.set(null);
    this.referencia.set(null);
    this.dataInicio.set(null);
    this.dataFim.set(null);
    this.pageIndex.set(0);
  }

  regiaoOptions = computed(() => {
    const values = this.armadilhas().map(c => c.regiao);
    return [...new Set(values)];
  });

  referenciaOptions = computed(() => {
    const values = this.armadilhas().map(c => c.referencia);
    return [...new Set(values)];
  });

  // TEXT SEARCH
  // SELECTS (armadilha, status, situação, região)
  onSearch(e: Event) {
    this.search.set((e.target as HTMLInputElement).value.toLowerCase());
    this.pageIndex.set(0);
  }

  onRegiao(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.regiao.set(value || null);
    this.pageIndex.set(0);
  }

  onReferencia(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.referencia.set(value || null);
    this.pageIndex.set(0);
  }

  onInicio(event: Event) {
    const date = (event.target as HTMLInputElement).valueAsDate;
    this.dataInicio.set(date ?? null);
    this.pageIndex.set(0);
  }

  onFim(event: Event) {
    const date = (event.target as HTMLInputElement).valueAsDate;
    this.dataFim.set(date ?? null);
    this.pageIndex.set(0);
  }
  onSort(s: Sort) {
    this.sort.set(s);
    this.pageIndex.set(0);
  }

  onPage(e: PageEvent) {
    this.pageIndex.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
  }

  create() {
    this.router.navigate(['/workspace/mosquitos/armadilhas-carrapatos/new']);
  }



}

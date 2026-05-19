import { CommonModule } from "@angular/common";
import { Component, AfterViewInit, inject, NgZone, signal, ViewChild, ElementRef, computed, effect } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule, Sort } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { Router } from "@angular/router";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { XYZ } from "ol/source";
import VectorSource from "ol/source/Vector";
import { Style, Fill, Stroke, Circle } from "ol/style";
import { ApiConnectionService } from "../../../../../../../../services/api-connection-service";
import { ProjectContextService } from "../../../../../../../../services/project-context.service";
import { Exemplar } from "../exemplar.model";
import { Feature, Map, View } from 'ol';
import { Point } from "ol/geom";

@Component({
    selector: 'app-exemplares-list',
    imports: [
        CommonModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatTabsModule
    ],
    templateUrl: './exemplar-list.html',
    styleUrl: './exemplar-list.css',
})
export class ExemplaresList implements AfterViewInit {

    private projectContext = inject(ProjectContextService);
    private api = inject(ApiConnectionService);
    private zone = inject(NgZone);

    selectedProject = this.projectContext.selected;

    exemplares = signal<Exemplar[]>([]);

    @ViewChild('mapElement') mapElement!: ElementRef<HTMLDivElement>;
    map = signal<Map | null>(null);

    pageIndex = signal(0);
    pageSize = signal(10);
    loading = signal(false);

    cols = ['id', 'nm_comum', 'nm_cientifico', 'endereco', 'idade', 'valor'];

    search = signal('');

    filtered = computed(() => {
        return this.exemplares().filter(e => {

            if (this.search()) {
                const text = `${e.nm_comum} ${e.nm_cientifico}`.toLowerCase();
                if (!text.includes(this.search())) return false;
            }

            // nome comum
            if (this.nmComum() && e.nm_comum !== this.nmComum()) {
                return false;
            }

            // nome cientifico
            if (this.nmCientifico() && e.nm_cientifico !== this.nmCientifico()) {
                return false;
            }


            return true;
        });
    });

    // ORDENAÇÃO
    sorted = computed(() => {
        const { active, direction } = this.sort();
        if (!direction) return this.filtered();

        return [...this.filtered()].sort((a, b) => {
            let v1: any;
            let v2: any;

            switch (active) {
                case 'valor':
                    v1 = a.valor;
                    v2 = b.valor;
                    return direction === 'asc' ? v1 - v2 : v2 - v1;
                    ;
                case 'idade':
                    v1 = a.idade_aproximada;
                    v2 = b.idade_aproximada;
                    return direction === 'asc' ? v1 - v2 : v2 - v1;
                case 'nm_comum':
                    return direction === 'asc'
                        ? a.nm_comum.localeCompare(b.nm_comum)
                        : b.nm_comum.localeCompare(a.nm_comum);

                case 'nm_cientifico':
                    return direction === 'asc'
                        ? a.nm_cientifico.localeCompare(b.nm_cientifico)
                        : b.nm_cientifico.localeCompare(a.nm_cientifico);
                default:
                    return 0;
            }
        });
    });

    sort = signal<Sort>({ active: 'nome', direction: 'asc' });

    pagedData = computed(() => {
        const start = this.pageIndex() * this.pageSize();
        return this.sorted().slice(start, start + this.pageSize());
    });


    nomeComumOptions = computed(() => {
        const values = this.exemplares().map(c => c.nm_comum);
        return [...new Set(values)];
    });

    nomeCientificoOptions = computed(() => {
        const values = this.exemplares().map(c => c.nm_cientifico);
        return [...new Set(values)];
    });

    selectedTab = signal(0);

    private source = new VectorSource();

    private layer = new VectorLayer({
        source: this.source,
        style: new Style({
            image: new Circle({
                radius: 8,
                fill: new Fill({ color: 'rgba(34, 197, 94, 0.6)' }),
                stroke: new Stroke({ color: '#fff', width: 2 })
            })
        })
    });

    constructor(private router: Router) {

        effect(() => {
            this.selectedProject();
            this.loadData();
        });

        effect(() => {
            const map = this.map();
            const data = this.filtered();

            if (!map) return;

            this.source.clear();

            const features = data.map(e => {
                const f = new Feature({
                    geometry: new Point([e.lon, e.lat])
                });

                f.set('id', e.id);
                f.set('nome', e.nm_comum);

                return f;
            });

            this.source.addFeatures(features);

            if (features.length) {
                map.getView().fit(this.source.getExtent(), {
                    padding: [100, 100, 100, 100],
                    maxZoom: 18
                });
            }
        });

    }
    ngAfterViewInit(): void {
        // throw new Error("Method not implemented.");
    }

    onTabChange(index: number) {
        this.selectedTab.set(index);

        if (index !== 1) return;

        if (this.map()) {
            setTimeout(() => this.map()?.updateSize());
            return;
        }

        const map = new Map({
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                    })
                }),
                this.layer
            ],
            view: new View({
                projection: 'EPSG:4326',
                center: [-46.92, -23.45],
                zoom: 10
            })
        });

        map.setTarget(this.mapElement.nativeElement);

        map.on('singleclick', (event) => {
            map.forEachFeatureAtPixel(event.pixel, (f) => {
                const id = f.get('id');
                if (id) {
                    this.router.navigate(['/workspace/inventario/exemplares', id]);
                }
            });
        });

        this.map.set(map);

        setTimeout(() => map.updateSize());
    }

    loadData() {
        const project = this.selectedProject();

        if (!project) {
            this.exemplares.set([]);
            return;
        }

        this.loading.set(true);

        this.api.listarExemplaresByProjeto(project.id).subscribe({
            next: data => {
                this.exemplares.set(data);
                this.loading.set(false);
            },
            error: () => {
                this.exemplares.set([]);
                this.loading.set(false);
            }
        });
    }

    nmComum = signal<string | null>(null);
    nmCientifico = signal<string | null>(null);


    resetFilters() {
        this.search.set('');
        this.nmComum.set(null);
        this.nmCientifico.set(null);
        this.pageIndex.set(0);
    }

    onNomeComum(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        this.nmComum.set(value || null);
        this.pageIndex.set(0);
    }

    onNomeCientifico(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        this.nmCientifico.set(value || null);
        this.pageIndex.set(0);
    }

    onSearch(e: Event) {
        this.search.set((e.target as HTMLInputElement).value.toLowerCase());
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

    reload() {
        this.loadData();
    }

    open(e: Exemplar, ev?: Event) {
        ev?.stopPropagation();
        this.router.navigate(['/workspace/inventario/exemplares', e.id]);
    }

    create() {
        this.router.navigate(['/workspace/inventario/exemplares/new']);
    }

    goBack() {
        this.router.navigate(['/workspace']);
    }

}
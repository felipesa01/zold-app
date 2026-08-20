import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    NgZone,
    ViewChild,
    computed,
    effect,
    inject,
    signal
} from '@angular/core';

import { Router } from '@angular/router';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';

import Map from 'ol/Map';
import View from 'ol/View';

import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';

import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

import { Circle, Fill, Stroke, Style } from 'ol/style';
import { AuthService } from '../../../../../../../../../auth/services/auth.service';
import { ApiConnectionService } from '../../../../../../../../services/api-connection-service';
import { PermissionService } from '../../../../../../../../services/permission-service';
import { ProjectContextService } from '../../../../../../../../services/project-context.service';
import { RecomendacaoInventario, RecomendacaoInventarioList } from '../recomendacoes.model';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ListReloadService } from '../../../../../../../../services/list-reload-service';


@Component({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule
    ],
    selector: 'app-recomendacoes-list',
    templateUrl: './recomendacoes-list.html',
    styleUrl: './recomendacoes-list.css'
})
export class RecomendacoesList implements AfterViewInit {

    private projectContext = inject(ProjectContextService);
    private api = inject(ApiConnectionService);
    private zone = inject(NgZone);
    private readonly authService = inject(AuthService);
    private cdr = inject(ChangeDetectorRef);
    private listReload = inject(ListReloadService);

    permissionService = inject(PermissionService);

    public readonly user = this.authService.currentUser;

    selectedProject = this.projectContext.selected;

    // =========================================================
    // DADOS
    // =========================================================

    recomendacoes = signal<RecomendacaoInventarioList[]>([]);

    loading = signal(false);

    // =========================================================
    // TABELA
    // =========================================================

    cols = [
        'id',
        'status',
        'titulo',
        'dataAnalise',
        'descricao',
        'nm_comum',
        'endereco'
    ];

    pageIndex = signal(0);
    pageSize = signal(10);

    // =========================================================
    // BUSCA
    // =========================================================

    search = signal('');

    // =========================================================
    // FILTROS
    // =========================================================

    nmEndereco = signal<string | null>(null);

    statusRecomendacao = signal<string | null>(null);

    dataInicio = signal<string | null>(null);

    dataFim = signal<string | null>(null);

    // =========================================================
    // OPÇÕES DOS FILTROS
    // =========================================================

    enderecoOptions = computed(() => {

        const values = this.recomendacoes()
            .map(r => r.endereco)
            .filter(Boolean);

        return [...new Set(values)].sort((a, b) =>
            a.localeCompare(b)
        );
    });


    statusOptions = computed(() => {

        const values = this.recomendacoes()
            .map(r => r.status)
            .filter(Boolean);

        return [...new Set(values)].sort((a, b) =>
            a.localeCompare(b)
        );
    });


    // =========================================================
    // FILTRAGEM
    // =========================================================

    filtered = computed(() => {

        const search = this.search().trim().toLowerCase();
        const endereco = this.nmEndereco();
        const status = this.statusRecomendacao();
        const inicio = this.dataInicio();
        const fim = this.dataFim();

        return this.recomendacoes().filter(r => {

            // ---------------------------------------------
            // BUSCA
            // ---------------------------------------------

            if (search) {

                const text = `
                    ${r.id}
                    ${r.titulo}
                    ${r.descricao ?? ''}
                    ${r.nm_comum ?? ''}
                    ${r.endereco ?? ''}
                    ${r.status ?? ''}
                `.toLowerCase();

                if (!text.includes(search)) {
                    return false;
                }
            }


            // ---------------------------------------------
            // ENDEREÇO
            // ---------------------------------------------

            if (
                endereco &&
                r.endereco !== endereco
            ) {
                return false;
            }


            // ---------------------------------------------
            // STATUS
            // ---------------------------------------------

            if (
                status &&
                r.status !== status
            ) {
                return false;
            }


            // ---------------------------------------------
            // DATA
            // ---------------------------------------------

            if (inicio || fim) {

                if (!r.dataAnalise) {
                    return false;
                }

                const data = new Date(r.dataAnalise);

                // Data inicial
                if (inicio) {

                    const inicioDate = new Date(`${inicio}T00:00:00`);

                    if (data < inicioDate) {
                        return false;
                    }
                }


                // Data final
                if (fim) {

                    const fimDate = new Date(`${fim}T23:59:59.999`);

                    if (data > fimDate) {
                        return false;
                    }
                }
            }


            return true;
        });
    });


    // =========================================================
    // ORDENAÇÃO
    // =========================================================

    sort = signal<Sort>({
        active: 'dataAnalise',
        direction: 'desc'
    });


    sorted = computed(() => {

        const {
            active,
            direction
        } = this.sort();

        if (!direction) {
            return this.filtered();
        }

        return [...this.filtered()].sort((a, b) => {

            let v1: any;
            let v2: any;

            switch (active) {

                case 'status':

                    v1 = a.status ?? '';
                    v2 = b.status ?? '';

                    return direction === 'asc'
                        ? v1.localeCompare(v2)
                        : v2.localeCompare(v1);


                case 'titulo':

                    v1 = a.titulo ?? '';
                    v2 = b.titulo ?? '';

                    return direction === 'asc'
                        ? v1.localeCompare(v2)
                        : v2.localeCompare(v1);


                case 'dataAnalise':

                    v1 = a.dataAnalise
                        ? new Date(a.dataAnalise).getTime()
                        : 0;

                    v2 = b.dataAnalise
                        ? new Date(b.dataAnalise).getTime()
                        : 0;

                    return direction === 'asc'
                        ? v1 - v2
                        : v2 - v1;


                case 'nm_comum':

                    v1 = a.nm_comum ?? '';
                    v2 = b.nm_comum ?? '';

                    return direction === 'asc'
                        ? v1.localeCompare(v2)
                        : v2.localeCompare(v1);


                case 'endereco':

                    v1 = a.endereco ?? '';
                    v2 = b.endereco ?? '';

                    return direction === 'asc'
                        ? v1.localeCompare(v2)
                        : v2.localeCompare(v1);


                default:

                    return 0;
            }
        });
    });


    // =========================================================
    // PAGINAÇÃO
    // =========================================================

    pagedData = computed(() => {

        const start =
            this.pageIndex() * this.pageSize();

        return this.sorted().slice(
            start,
            start + this.pageSize()
        );
    });


    // =========================================================
    // MAPA
    // =========================================================

    @ViewChild('mapElement')
    mapElement!: ElementRef<HTMLDivElement>;

    map = signal<Map | null>(null);

    private source = new VectorSource();

    private layer = new VectorLayer({

        source: this.source,

        style: new Style({

            image: new Circle({

                radius: 8,

                fill: new Fill({
                    color: 'rgba(34, 197, 94, 0.6)'
                }),

                stroke: new Stroke({
                    color: '#fff',
                    width: 2
                })
            })
        })
    });


    selectedTab = signal(0);


    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    constructor(
        private router: Router
    ) {


        effect(() => {
            this.listReload.reload();
            this.loadData();
        })
        // ---------------------------------------------
        // CARREGA QUANDO O PROJETO MUDA
        // ---------------------------------------------

        effect(() => {

            const project = this.selectedProject();

            if (!project) {

                this.recomendacoes.set([]);

                return;
            }

            this.loadData();
        });


        // ---------------------------------------------
        // ATUALIZA MAPA QUANDO FILTROS MUDAM
        // ---------------------------------------------

        effect(() => {

            const map = this.map();
            const data = this.filtered();
            if (!map) { return; }
            this.source.clear();
            const features: Feature[] = [];

            for (const r of data) {

                const lat = Number(r.lat);
                const lon = Number(r.lon);

                if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
                    continue;
                }

                const feature = new Feature({
                    geometry: new Point([lon, lat])
                });

                feature.set('id', r.id);
                feature.set('titulo', r.titulo);
                feature.set('status', r.status);
                feature.set('exemplarId', r.exemplarId);
                features.push(feature);
            }

            this.source.addFeatures(features);


            // -----------------------------------------
            // ENQUADRA OS PONTOS
            // -----------------------------------------

            if (features.length) {

                const extent =
                    this.source.getExtent();

                if (
                    extent &&
                    extent.every(Number.isFinite)
                ) {

                    map.getView().fit(
                        extent,
                        {
                            padding: [
                                10,
                                80,
                                10,
                                80
                            ],
                            maxZoom: 24
                        }
                    );
                }
            }
        });
    }


    // =========================================================
    // AFTER VIEW INIT
    // =========================================================

    ngAfterViewInit(): void {
        // O mapa é criado somente quando a aba Mapa é aberta.
    }


    // =========================================================
    // ABAS
    // =========================================================

    onTabChange(index: number) {

        this.selectedTab.set(index);

        if (index !== 1) {
            return;
        }


        // ---------------------------------------------
        // MAPA JÁ EXISTE
        // ---------------------------------------------

        if (this.map()) {

            const map = this.map()!;

            setTimeout(() => {

                map.setTarget(
                    this.mapElement.nativeElement
                );
                map.updateSize();
                map.renderSync();

            }, 50);

            return;
        }


        // ---------------------------------------------
        // CRIA MAPA
        // ---------------------------------------------

        const map = new Map({

            layers: [

                new TileLayer({
                    source: new XYZ({
                        url:
                            'https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                    })
                }),
                this.layer
            ],

            view: new View({
                projection: 'EPSG:4326',
                center: [
                    -46.92,
                    -23.45
                ],
                zoom: 10
            }),

            controls: []
        });


        map.setTarget(
            this.mapElement.nativeElement
        );


        // ---------------------------------------------
        // CLIQUE NO PONTO
        // ---------------------------------------------

        map.on(
            'singleclick',
            event => {

                map.forEachFeatureAtPixel(
                    event.pixel,
                    feature => {

                        const id =
                            feature.get('id');

                        const exemplarid =
                            feature.get('exemplarId');

                        if (id) {
                            this.zone.run(() => {
                                this.router.navigate(['/workspace/inventario/exemplares', exemplarid],
                                    {
                                        queryParams: {
                                            go2recomendacao: id
                                        }
                                    });
                            });
                        }
                        return true;
                    }
                );
            }
        );


        this.map.set(map);


        setTimeout(() => {
            map.updateSize();
            map.renderSync();
        }, 50);
    }


    // =========================================================
    // CARREGAMENTO
    // =========================================================

    loadData() {

        const project =
            this.selectedProject();

        if (!project) {
            this.recomendacoes.set([]);
            return;
        }
        this.loading.set(true);

        this.api.listarRecomendacoesByProjeto(project.id).subscribe({
            next: data => {
                this.recomendacoes.set(data);
                this.loading.set(false);
                setTimeout(() => {
                    this.map()?.setTarget(
                        this.mapElement?.nativeElement
                    );
                    this.map()?.updateSize();
                    this.map()?.renderSync();
                }, 100);
            },

            error: () => {
                this.recomendacoes.set([]);
                this.loading.set(false);
            }
        });
    }


    // =========================================================
    // FILTRO - ENDEREÇO
    // =========================================================

    onEndereco(event: Event) {

        const value =
            (event.target as HTMLSelectElement).value;

        this.nmEndereco.set(
            value || null
        );

        this.pageIndex.set(0);
    }


    // =========================================================
    // FILTRO - STATUS
    // =========================================================

    onStatus(event: Event) {

        const value =
            (event.target as HTMLSelectElement).value;

        this.statusRecomendacao.set(
            value || null
        );

        this.pageIndex.set(0);
    }


    // =========================================================
    // FILTRO - DATA INÍCIO
    // =========================================================

    onDataInicio(event: Event) {

        const value =
            (event.target as HTMLInputElement).value;

        this.dataInicio.set(
            value || null
        );

        this.pageIndex.set(0);
    }


    // =========================================================
    // FILTRO - DATA FIM
    // =========================================================

    onDataFim(event: Event) {

        const value =
            (event.target as HTMLInputElement).value;

        this.dataFim.set(
            value || null
        );

        this.pageIndex.set(0);
    }


    // =========================================================
    // BUSCA
    // =========================================================

    onSearch(event: Event) {

        const value =
            (event.target as HTMLInputElement).value;

        this.search.set(
            value.toLowerCase()
        );

        this.pageIndex.set(0);
    }


    // =========================================================
    // ORDENAÇÃO
    // =========================================================

    onSort(sort: Sort) {

        this.sort.set(sort);

        this.pageIndex.set(0);
    }


    // =========================================================
    // PAGINAÇÃO
    // =========================================================

    onPage(event: PageEvent) {

        this.pageIndex.set(
            event.pageIndex
        );

        this.pageSize.set(
            event.pageSize
        );
    }


    // =========================================================
    // RECARREGAR
    // =========================================================

    reload() {
        this.loadData();
    }


    // =========================================================
    // ABRIR
    // =========================================================

    open(
        recomendacao: RecomendacaoInventarioList,
        event?: Event
    ) {

        event?.stopPropagation();
        this.router.navigate(['/workspace/inventario/exemplares', recomendacao.exemplarId],
            {
                queryParams: {
                    go2recomendacao: recomendacao.id
                }
            });
    }


    // =========================================================
    // CRIAR
    // =========================================================

    create() {

        this.router.navigate([
            '/workspace/inventario/recomendacoes/new'
        ]);
    }


    // =========================================================
    // VOLTAR
    // =========================================================

    goBack() {

        this.router.navigate([
            '/workspace'
        ]);
    }
}
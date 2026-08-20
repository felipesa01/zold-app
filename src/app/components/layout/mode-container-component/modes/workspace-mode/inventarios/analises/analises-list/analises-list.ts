import { CommonModule } from "@angular/common";
import { Component, inject, signal, effect, computed, model } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule, Sort } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltip } from "@angular/material/tooltip";
import { Router, NavigationEnd } from "@angular/router";
import { filter, catchError, of, forkJoin } from "rxjs";
import { ApiConnectionService } from "../../../../../../../../services/api-connection-service";
import { ProjectContextService } from "../../../../../../../../services/project-context.service";
import { AnaliseInventario } from "../analise.model";
import { Exemplar } from "../../exemplares/exemplar.model";

@Component({
    selector: 'app-analises-list',
    imports: [
        CommonModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatSelectModule,
        MatDatepickerModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatNativeDateModule,
        MatTooltip
    ],
    templateUrl: './analises-list.html',
    styleUrl: './analises-list.css',
})
export class AnalisesList {

    cols = [
        'exemplar',
        'data',
        'dap',
        'altura',
        'pragas',
        'fungos',
        'bacterias',
        'problemas'
    ];

    private projectContext = inject(ProjectContextService);
    selectedProject = this.projectContext.selected;
    private api = inject(ApiConnectionService);

    private analises = signal<AnaliseInventario[]>([]);

    exemplares = signal<Exemplar[]>([]);
    loading = signal(false);

    constructor(private router: Router) {
        effect(() => {
            this.selectedProject();
            this.loadData();
        });

        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe(() => {
                if (this.router.url.includes('/workspace/inventario/analises')) {
                    this.loadData();
                }
            });
    }

    loadData() {
        const project = this.selectedProject();

        if (!project) {
            this.analises.set([]);
            return;
        }

        this.loading.set(true);
        forkJoin({
            exemplares: this.api.listarExemplaresByProjeto(project.id).pipe(
                catchError(() => of([]))
            ),
            analises: this.api.listarAnalisesByProjeto(project.id).pipe(
                catchError(() => of([]))
            )
        }).subscribe(({ exemplares, analises }) => {
            this.exemplares.set([...exemplares]);
            this.analises.set([...analises]);
            this.loading.set(false);
        });
    }

    reload() {
        this.loadData();
    }

    exemplarMap = computed(() =>
        new Map(this.exemplares().map(a => [a.id, a]))
    );
    getExemplar(id: string): Exemplar | undefined {
        return this.exemplarMap().get(id);
    }



    open(
        analise: AnaliseInventario,
        event?: Event
    ) {

        event?.stopPropagation();
        this.router.navigate(['/workspace/inventario/exemplares', analise.exemplarId],
            {
                queryParams: {
                    go2analise: analise.id
                }
            });
    }

    goBack() {
        this.router.navigate(['/workspace']);
    }

    create() {
        this.router.navigate(['/workspace/inventario/analises/new']);
    }

    // =====================
    // FILTROS
    // =====================

    search = signal('');
    exemplarId = model<string | null>(null);
    dataInicio = signal<Date | null>(null);
    dataFim = signal<Date | null>(null);

    filtered = computed(() => {

        const exemplar = this.exemplares().filter(e => e.id == this.exemplarId())[0]

        return this.analises().filter(a => {

            if (this.exemplarId()) {
                if (!(a.exemplarId == this.exemplarId())) return false
            }

            if (this.search()) {

                const exemplar = this.exemplares().filter(e => e.id == a.exemplarId)[0]

                const text = `${exemplar.nm_comum}`.toLowerCase();

                if (!text.includes(this.search())) return false;
            }

            const d = new Date(a.data);

            if (this.dataInicio() && d < this.dataInicio()!) return false;
            if (this.dataFim() && d > this.dataFim()!) return false;

            return true;



        });
    });

    resetFilters() {
        this.search.set('');
        this.exemplarId.set(null)
        this.dataInicio.set(null);
        this.dataFim.set(null);
        this.pageIndex.set(0);
    }

    // =====================
    // ORDENAÇÃO
    // =====================

    sort = signal<Sort>({ active: 'data', direction: 'desc' });

    sorted = computed(() => {
        const { active, direction } = this.sort();
        if (!direction) return this.filtered();

        return [...this.filtered()].sort((a, b) => {
            let v1: any;
            let v2: any;

            switch (active) {
                case 'data':
                    v1 = new Date(a.data).getTime();
                    v2 = new Date(b.data).getTime();
                    break;
                case 'dap':
                    v1 = a.dap;
                    v2 = b.dap;
                    break;
                case 'altura':
                    v1 = a.altura;
                    v2 = b.altura;
                    break;
                default:
                    return 0;
            }

            return direction === 'asc' ? v1 - v2 : v2 - v1;
        });
    });

    // =====================
    // PAGINAÇÃO
    // =====================

    pageIndex = signal(0);
    pageSize = signal(10);

    pagedData = computed(() => {
        const start = this.pageIndex() * this.pageSize();
        return this.sorted().slice(start, start + this.pageSize());
    });

    onSearch(e: Event) {
        this.search.set((e.target as HTMLInputElement).value.toLowerCase());
        this.pageIndex.set(0);
    }

    onInicio(e: Event) {
        this.dataInicio.set(new Date((e.target as HTMLInputElement).value));
    }

    onFim(e: Event) {
        this.dataFim.set(new Date((e.target as HTMLInputElement).value));
    }

    onSort(sort: Sort) {
        this.sort.set(sort);
    }

    onPage(e: PageEvent) {
        this.pageIndex.set(e.pageIndex);
        this.pageSize.set(e.pageSize);
    }

    onExemplar(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        this.exemplarId.set(value || null);
        this.pageIndex.set(0);
    }

    // =====================
    // HELPERS
    // =====================

    // hasPragas(a: AnaliseInventario) {
    //     return a.ataque_praga
    // }

    // hasFungos(a: AnaliseInventario) {
    //     return a.ataque_fungo;
    // }

    // hasBacterias(a: AnaliseInventario) {
    //     return a.ataque_praga || a.ataque_fungo || a.ataque_bacteria;
    // }

    // hasProblemas(a: AnaliseInventario) {
    //     return a.deficiencia_nutricional;
    // }


}
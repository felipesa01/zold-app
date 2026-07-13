import { CommonModule } from "@angular/common";
import { Component, inject, signal, effect, computed, model } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatChip } from "@angular/material/chips";
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
import { filter, forkJoin, catchError, of } from "rxjs";
import { ApiConnectionService } from "../../../../../../../../services/api-connection-service";
import { ProjectContextService } from "../../../../../../../../services/project-context.service";
import { compareDatesOnly, datePureToUTCString } from "../../../../../../../../utils/date-pure-to-UTC";
import { CapturaCarrapato } from "../captura-carrapato.model";
import { ArmadilhaCarrapato } from "../../armadilhas/armadilha-carrapato.model";

@Component({
    selector: 'app-capturas-carrapatos-list',
    imports: [CommonModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatChip,
        MatPaginatorModule,
        MatSelectModule,
        MatDatepickerModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule, MatTooltip],
    templateUrl: './capturas-carrapato-list.html',
    styleUrl: './capturas-carrapato-list.css',
})

export class CapturasCarrapatosList {

    cols = ['armadilha', 'data', 'larva', 'ninfa', 'adulto', 'total'];

    private projectContext = inject(ProjectContextService);
    selectedProject = this.projectContext.selected;
    private api = inject(ApiConnectionService);

    private capturas = signal<CapturaCarrapato[]>([]);

    armadilhas = signal<ArmadilhaCarrapato[]>([]);
    loading = signal(false);

    constructor(private router: Router) {
        effect(() => {
            this.selectedProject();
            this.loadData()
        })

        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe(() => {
                if (this.router.url.includes('/workspace/carrapatos/capturas-carrapatos')) {
                    this.loadData();
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

        forkJoin({
            armadilhas: this.api.listarArmadilhasCarrapatosByProjeto(project.id).pipe(
                catchError(() => of([]))
            ),
            capturas: this.api.listarCapturasCarrapatosByProjeto(project.id).pipe(
                catchError(() => of([]))
            )
        }).subscribe(({ armadilhas, capturas }) => {
            this.armadilhas.set([...armadilhas]);
            this.capturas.set([...capturas]);
            this.loading.set(false);
        });
    }

    reload() {
        this.loadData();
    }


    getArmadilha(id: string): ArmadilhaCarrapato | undefined {
        return this.armadilhaMap().get(id);
    }

    open(c: CapturaCarrapato, e?: Event) {
        e?.stopPropagation();
        this.router.navigate(['/workspace/carrapatos/capturas-carrapatos', c.id]);
    }

    goBack() {
        this.router.navigate(['/workspace']);
    }

    armadilhaMap = computed(() =>
        new Map(this.armadilhas().map(a => [a.id, a]))
    );

    // filtros
    search = signal('');
    armadilhaId = model<string | null>(null);
    dataInicio = signal<Date | null>(null);
    dataFim = signal<Date | null>(null);

    // ordenação
    sort = signal<Sort>({ active: 'data', direction: 'desc' });

    // paginação
    pageIndex = signal(0);
    pageSize = signal(10);



    // FILTROS
    filtered = computed(() => {
        return this.capturas().filter(c => {

            // texto
            if (this.search()) {
                const arm = this.getArmadilha(c.armadilhaId);
                const text = `${arm?.nome}`.toLowerCase();
                if (!text.includes(this.search())) return false;
            }

            // armadilha
            if (this.armadilhaId() && c.armadilhaId !== this.armadilhaId()) {
                return false;
            }

            // período
            const d = new Date(c.data);
            // console.log('c.data', c.data)
            // console.log('d', d)

            if (this.dataInicio() && compareDatesOnly(d, this.dataInicio()!) < 0) return false;
            if (this.dataFim() && compareDatesOnly(d, this.dataFim()!) > 0) return false;

            return true;
        });
    });

    resetFilters() {
        this.search.set('');
        this.armadilhaId.set(null);

        this.dataInicio.set(null);
        this.dataFim.set(null);
        this.pageIndex.set(0);
    }

    // ORDENAÇÃO
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
                case 'total':
                    v1 = a.numTotal;
                    v2 = b.numTotal;
                    break;
                case 'larva':
                    v1 = a.numLarva;
                    v2 = b.numLarva;
                    break;
                case 'ninfa':
                    v1 = a.numNinfa;
                    v2 = b.numNinfa;
                    break;
                case 'adulto':
                    v1 = a.numAdulto;
                    v2 = b.numAdulto;
                    break;
                default:
                    return 0;
            }

            return direction === 'asc' ? v1 - v2 : v2 - v1;
        });
    });

    // PAGINAÇÃO
    pagedData = computed(() => {
        const start = this.pageIndex() * this.pageSize();
        return this.sorted().slice(start, start + this.pageSize());
    });


    onSearch(e: Event) {
        this.search.set((e.target as HTMLInputElement).value.toLowerCase());
        this.pageIndex.set(0);
    }

    onArmadilha(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        this.armadilhaId.set(value || null);
        this.pageIndex.set(0);
    }

    onInicio(event: Event) {
        const date = (event.target as HTMLInputElement).value;
        this.dataInicio.set(new Date(datePureToUTCString(date)) ?? null);
        this.pageIndex.set(0);
    }

    onInicioPicker(event: any, input: HTMLInputElement) {
        const date = event.value as Date | null;

        if (!date) {
            this.dataInicio.set(null);
            input.value = '';
            return;
        }

        // Formata com zero à esquerda
        input.value = this.formatarData(date);

        // Mantém sua lógica UTC
        // const utcDate = new Date(datePureToUTCString(date));
        const utcDate = date

        this.dataInicio.set(utcDate);
        this.pageIndex.set(0);
    }


    onInicioDigitado(event: Event) {
        let valor = (event.target as HTMLInputElement).value;

        // Remove tudo que não é número
        valor = valor.replace(/\D/g, '');

        // Aplica máscara dd/MM/yyyy
        if (valor.length > 2) valor = valor.replace(/^(\d{2})(\d)/, '$1/$2');
        if (valor.length > 5) valor = valor.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');

        (event.target as HTMLInputElement).value = valor;
    }

    validarInicio(event: Event) {
        const input = event.target as HTMLInputElement;
        const valor = input.value;

        if (!valor || valor.length !== 10) {
            this.dataInicio.set(null);
            return;
        }

        const [diaStr, mesStr, anoStr] = valor.split('/');

        const dia = Number(diaStr);
        const mes = Number(mesStr) - 1;
        const ano = Number(anoStr);

        const date = new Date(ano, mes, dia);

        // Bloqueia datas impossíveis
        const invalida =
            isNaN(date.getTime()) ||
            date.getDate() !== dia ||
            date.getMonth() !== mes ||
            date.getFullYear() !== ano;

        if (invalida) {
            input.value = '';
            this.dataInicio.set(null);
            return;
        }

        // Mantém sua lógica UTC
        // const utcDate = new Date(datePureToUTCString(date));
        const utcDate = date

        this.dataInicio.set(utcDate);
        this.pageIndex.set(0);
    }

    formatarData(date: Date): string {
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }


    onFim(event: Event) {
        const date = (event.target as HTMLInputElement).value;
        this.dataFim.set(new Date(datePureToUTCString(date)) ?? null);
        this.pageIndex.set(0);
    }

    onSort(sort: Sort) {
        this.sort.set(sort);
    }

    onPage(e: PageEvent) {
        this.pageIndex.set(e.pageIndex);
        this.pageSize.set(e.pageSize);
    }

    create() {
        this.router.navigate(['/workspace/carrapatos/capturas-carrapatos/new']);
    }

}

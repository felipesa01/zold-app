import { CommonModule } from "@angular/common";
import { Component, inject, signal, computed } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatChip } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule, Sort } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { NavigationEnd, Router } from "@angular/router";
import { catchError, filter, of } from "rxjs";
import { ApiConnectionService } from "../../../../../../../services/api-connection-service";
import { Projeto } from "../projetos.model";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: 'app-projetos-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatChip,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './projetos-list.html',
  styleUrl: './projetos-list.css'
})
export class ProjetosList {

  cols = ['nome', 'status', 'responsavel', 'cidade', 'uf', 'acoes'];

  private api = inject(ApiConnectionService);
  private router = inject(Router);

  projetos = signal<Projeto[]>([]);
  loading = signal(false);

  search = signal('');
  status = signal<string | null>(null);
  cidade = signal<string | null>(null);


  sort = signal<Sort>({ active: 'nome', direction: 'asc' });

  pageIndex = signal(0);
  pageSize = signal(10);

  constructor() {
    this.loadData();

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url.includes('/workspace/projetos')) {
          this.loadData();
        }
      });
  }

  loadData() {
    this.loading.set(true);

    this.api.listarProjetos().pipe(
      catchError(() => of([]))
    ).subscribe(p => {
      this.projetos.set(p);
      this.loading.set(false);
    });
  }

  reload() {
    this.loadData();
  }

  create() {
    this.router.navigate(['/workspace/projetos/new']);
  }

  open(p: Projeto, e?: Event) {
    e?.stopPropagation();
    this.router.navigate(['/workspace/projetos', p.id]);
  }

  goBack() {
    this.router.navigate(['/workspace']);
  }

  statusColor(status: string) {
    return status === 'ATIVO' ? 'primary' : 'warn';
  }

  filtered = computed(() => {
    return this.projetos().filter(p => {

      if (this.search()) {
        const text = `${p.nome} ${p.responsavel} ${p.cidade}`.toLowerCase();
        if (!text.includes(this.search())) return false;
      }

      if (this.status() && p.status !== this.status()) return false;

      if (this.cidade() && p.cidade !== this.cidade()) return false;

      return true;
    });
  });

  sorted = computed(() => {
    const { active, direction } = this.sort();
    if (!direction) return this.filtered();

    return [...this.filtered()].sort((a, b) => {
      let v1 = a[active as keyof Projeto] ?? '';
      let v2 = b[active as keyof Projeto] ?? '';

      return direction === 'asc'
        ? String(v1).localeCompare(String(v2))
        : String(v2).localeCompare(String(v1));
    });
  });

  pagedData = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.sorted().slice(start, start + this.pageSize());
  });

  statusOptions = computed(() => {
    const values = this.projetos().map(p => p.status);
    return [...new Set(values)];
  });

  cidadeOptions = computed(() => {
    const values = this.projetos().map(p => p.cidade);
    return [...new Set(values)];
  });

  onSearch(e: Event) {
    this.search.set((e.target as HTMLInputElement).value.toLowerCase());
    this.pageIndex.set(0);
  }

  onStatus(e: Event) {
    this.status.set((e.target as HTMLSelectElement).value || null);
    this.pageIndex.set(0);
  }

  onCidade(e: Event) {
    this.cidade.set((e.target as HTMLSelectElement).value || null);
    this.pageIndex.set(0);
  }

  resetFilters() {
    this.search.set('');
    this.status.set(null);
    this.cidade.set(null);
    this.pageIndex.set(0);
  }

  onSort(sort: Sort) {
    this.sort.set(sort);
  }

  onPage(e: PageEvent) {
    this.pageIndex.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
  }
}

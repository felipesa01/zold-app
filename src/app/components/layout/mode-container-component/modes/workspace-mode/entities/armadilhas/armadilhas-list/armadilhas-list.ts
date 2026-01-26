import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Armadilha } from '../armadilha.model';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ProjectContextService } from '../../../../../../../../services/project-context.service';
import { ApiConnectionService } from '../../../../../../../../services/api-connection-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-armadilhas-list',
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
    MatProgressSpinnerModule],
  templateUrl: './armadilhas-list.html',
  styleUrl: './armadilhas-list.css',
})
export class ArmadilhasList {
  private projectContext = inject(ProjectContextService);
  selectedProject = this.projectContext.selected;
  private api = inject(ApiConnectionService);

  private armadilhas = signal<Armadilha[]>([]);



  pageIndex = signal(0);
  pageSize = signal(10);
  loading = signal(false);

  // regioes = ['Centro', 'Zona Norte', 'Zona Sul', 'Zona Leste'];
  cols = ['nome', 'regiao', 'referencia', 'acoes'];

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

  constructor(private router: Router) {
    effect(() => {
      const project = this.selectedProject();

      if (!project) {
        this.armadilhas.set([]);
        return;
      }

      this.loading.set(true);
      this.api.listarArmadilhasByProjeto(project.id).subscribe({
        next: data => {
          this.armadilhas.set([...data]);
          this.loading.set(false);
        },
        error: () => {
          this.armadilhas.set([]);
          this.loading.set(false);
        }
      });
    });
  }


  open(a: Armadilha, e?: Event) {
    e?.stopPropagation();
    this.router.navigate(['/workspace/entities/armadilhas', a.id]);
  }

  goBack() {
    this.router.navigate(['/workspace']);
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
    this.router.navigate(['/workspace/entities/armadilhas/new']);
  }

}

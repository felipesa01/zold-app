import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CAPTURAS_MOCK } from '../captura.mock';
import { Captura } from '../captura.model';
import { Armadilha } from '../../armadilhas/armadilha.model';
import { ARMADILHAS_MOCK } from '../../armadilhas/armadilhas.mock';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatChip } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ProjectContextService } from '../../../../../../../../services/project-context.service';
import { ApiConnectionService } from '../../../../../../../../services/api-connection-service';
import { catchError, forkJoin, of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-capturas-list',
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
    MatProgressSpinnerModule],
  templateUrl: './capturas-list.html',
  styleUrl: './capturas-list.css',
})
export class CapturasList {

  cols = ['armadilha', 'data', 'status', 'situacao', 'total', 'acoes'];


  private projectContext = inject(ProjectContextService);
  selectedProject = this.projectContext.selected;
  private api = inject(ApiConnectionService);

  // private capturas = signal<Captura[]>(CAPTURAS_MOCK);
  private capturas = signal<Captura[]>([]);

  // armadilhas = signal<Armadilha[]>(ARMADILHAS_MOCK);
  armadilhas = signal<Armadilha[]>([]);
  loading = signal(false);

  constructor(private router: Router) {
    effect(() => {
      const project = this.selectedProject();

      if (!project) {
        this.armadilhas.set([]);
        return;
      }

      this.loading.set(true);
      forkJoin({
        armadilhas: this.api.listarArmadilhasByProjeto(project.id).pipe(
          catchError(() => of([]))
        ),
        capturas: this.api.listarCapturasByProjeto(project.id).pipe(
          catchError(() => of([]))
        )
      }).subscribe(({ armadilhas, capturas }) => {
        this.armadilhas.set([...armadilhas]);
        this.capturas.set([...capturas]);
        this.loading.set(false);
      });
    });
  }


  getArmadilha(id: string): Armadilha | undefined {
    return this.armadilhaMap().get(id);
  }
  open(c: Captura, e?: Event) {
    e?.stopPropagation();
    this.router.navigate(['/workspace/entities/capturas', c.id]);
  }

  goBack() {
    this.router.navigate(['/workspace']);
  }

  statusColor(status: Captura['status']) {
    return status === 'ATIVA' ? 'primary' : 'warn';
  }

  situacaoColor(s: Captura['situacaoFisica']) {
    switch (s) {
      case 'REGULAR': return 'primary';
      case 'DERRUBADA': return 'accent';
      case 'EXTRAVIADA': return 'warn';
    }
  }

  armadilhaMap = computed(() =>
    new Map(this.armadilhas().map(a => [a.id, a]))
  );

  // filtros
  search = signal('');
  armadilhaId = signal<string | null>(null);
  dataInicio = signal<Date | null>(null);
  dataFim = signal<Date | null>(null);

  // ordenação
  sort = signal<Sort>({ active: 'data', direction: 'desc' });

  // paginação
  pageIndex = signal(0);
  pageSize = signal(10);

  // 🔹 FILTROS
  filtered = computed(() => {
    return this.capturas().filter(c => {

      // texto
      if (this.search()) {
        const arm = this.getArmadilha(c.armadilhaId);
        const text = `${arm?.nome} ${c.status} ${c.situacaoFisica}`.toLowerCase();
        if (!text.includes(this.search())) return false;
      }

      // armadilha
      if (this.armadilhaId() && c.armadilhaId !== this.armadilhaId()) {
        return false;
      }

      // período
      const d = new Date(c.data + 'T00:00:00');
      if (this.dataInicio() && d < this.dataInicio()!) return false;
      if (this.dataFim() && d > this.dataFim()!) return false;

      return true;
    });
  });

  // 🔹 ORDENAÇÃO
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
        default:
          return 0;
      }

      return direction === 'asc' ? v1 - v2 : v2 - v1;
    });
  });

  // 🔹 PAGINAÇÃO
  pagedData = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.sorted().slice(start, start + this.pageSize());
  });


  onSearch(e: Event) {
    this.search.set((e.target as HTMLInputElement).value.toLowerCase());
    this.pageIndex.set(0);
  }

  onArmadilha(id: string) {
    this.armadilhaId.set(id || null);
    this.pageIndex.set(0);
  }

  onInicio(d: Date | null) {
    this.dataInicio.set(d);
    this.pageIndex.set(0);
  }

  onFim(d: Date | null) {
    this.dataFim.set(d);
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
    this.router.navigate(['/workspace/entities/capturas/new']);
  }

}

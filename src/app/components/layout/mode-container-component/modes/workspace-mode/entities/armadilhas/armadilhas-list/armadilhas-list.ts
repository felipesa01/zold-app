import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ARMADILHAS_MOCK } from '../armadilhas.mock';
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

@Component({
  selector: 'app-armadilhas-list',
  imports: [CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule, MatPaginatorModule, MatSelectModule, MatDatepickerModule, MatSortModule],
  templateUrl: './armadilhas-list.html',
  styleUrl: './armadilhas-list.css',
})
export class ArmadilhasList {
  cols = ['nome', 'regiao', 'referencia', 'acoes'];

  private armadilhas = signal<Armadilha[]>(ARMADILHAS_MOCK);

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

  sort = signal<Sort>({ active: 'nome', direction: 'asc' });

  pagedData = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.sorted().slice(start, start + this.pageSize());
  });

  search = signal('');
  regiao = signal<string | null>(null);
  dataInicio = signal<Date | null>(null);
  dataFim = signal<Date | null>(null);

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

  pageIndex = signal(0);
  pageSize = signal(10);

  regioes = ['Centro', 'Zona Norte', 'Zona Sul', 'Zona Leste'];

  constructor(private router: Router) { }

  open(a: Armadilha, e?: Event) {
    e?.stopPropagation();
    this.router.navigate(['/workspace/entities/armadilhas', a.id]);
  }

  goBack() {
    this.router.navigate(['/workspace']);
  }

  onSearch(e: Event) {
    this.search.set((e.target as HTMLInputElement).value.toLowerCase());
    this.pageIndex.set(0);
  }

  onRegiao(r: string) {
    this.regiao.set(r || null);
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

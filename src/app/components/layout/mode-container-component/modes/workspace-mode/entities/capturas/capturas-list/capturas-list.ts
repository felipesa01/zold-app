import { Component, computed, signal } from '@angular/core';
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

@Component({
  selector: 'app-capturas-list',
  imports: [CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule, MatChip],
  templateUrl: './capturas-list.html',
  styleUrl: './capturas-list.css',
})
export class CapturasList {

  cols = ['armadilha', 'data', 'status', 'situacao', 'total', 'acoes'];

  private search = signal('');
  private capturas = signal<Captura[]>(CAPTURAS_MOCK);
  private armadilhas = signal<Armadilha[]>(ARMADILHAS_MOCK);

  filtered = computed(() =>
    this.capturas().filter(c => {
      const arm = this.getArmadilha(c.armadilhaId);
      const text = `
        ${arm?.nome ?? ''}
        ${arm?.regiao ?? ''}
        ${c.status}
        ${c.situacaoFisica}
      `.toLowerCase();

      return text.includes(this.search());
    })
  );

  constructor(private router: Router) { }

  onSearch(e: Event) {
    this.search.set((e.target as HTMLInputElement).value.toLowerCase());
  }

  getArmadilha(id: string): Armadilha | undefined {
    return this.armadilhas().find(a => a.id === id);
  }

  open(c: Captura) {
    this.router.navigate(['/workspace/entities/capturas', c.id]);
  }

  edit(c: Captura, e: Event) {
    e.stopPropagation();
    this.open(c);
  }

  remove(c: Captura, e: Event) {
    e.stopPropagation();
    console.log('delete', c);
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

  goBack() {
    this.router.navigate(['/workspace']);
  }

}

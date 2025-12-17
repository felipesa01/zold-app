import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ARMADILHAS_MOCK } from '../armadilhas.mock';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-armadilhas-list',
  imports: [CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './armadilhas-list.html',
  styleUrl: './armadilhas-list.css',
})
export class ArmadilhasList {
  cols = ['nome', 'regiao', 'referencia', 'acoes'];

  private search = signal('');
  private data = signal(ARMADILHAS_MOCK);

  filtered = computed(() =>
    this.data().filter(a =>
      a.nome.toLowerCase().includes(this.search()) ||
      a.regiao.toLowerCase().includes(this.search()) ||
      a.referencia.toLowerCase().includes(this.search())
    )
  );

  constructor(private router: Router) { }

  onSearch(e: Event) {
    this.search.set((e.target as HTMLInputElement).value.toLowerCase());
  }

  open(a: any) {
    this.router.navigate(['/workspace/entities/armadilhas', a.id]);
  }

  edit(a: any, e: Event) {
    e.stopPropagation();
    this.open(a);
  }

  remove(a: any, e: Event) {
    e.stopPropagation();
    console.log('delete', a);
  }

  goBack() {
    this.router.navigate(['/workspace']);
  }

}

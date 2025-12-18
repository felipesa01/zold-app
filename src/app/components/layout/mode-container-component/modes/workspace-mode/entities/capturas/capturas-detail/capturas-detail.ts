import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Armadilha } from '../../armadilhas/armadilha.model';
import { ARMADILHAS_MOCK } from '../../armadilhas/armadilhas.mock';
import { CAPTURAS_MOCK } from '../captura.mock';
import { Captura } from '../captura.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-capturas-detail',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatChip],
  templateUrl: './capturas-detail.html',
  styleUrl: './capturas-detail.css',
})
export class CapturasDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private capturaId = this.route.snapshot.paramMap.get('id')!;

  captura = computed<Captura | undefined>(() =>
    CAPTURAS_MOCK.find(c => c.id === this.capturaId)
  );

  armadilha = computed<Armadilha | undefined>(() =>
    ARMADILHAS_MOCK.find(a => a.id === this.captura()?.armadilhaId)
  );

  goBack() {
    this.router.navigate(['/workspace/entities/capturas']);
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


}

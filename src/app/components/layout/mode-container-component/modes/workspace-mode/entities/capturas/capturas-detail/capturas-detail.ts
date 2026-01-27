import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Armadilha } from '../../armadilhas/armadilha.model';
import { Captura } from '../captura.model';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChip } from '@angular/material/chips';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, of, switchMap } from 'rxjs';
import { ApiConnectionService } from '../../../../../../../../services/api-connection-service';

@Component({
  selector: 'app-capturas-detail',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatChip, RouterModule],
  templateUrl: './capturas-detail.html',
  styleUrl: './capturas-detail.css',
})
export class CapturasDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  armadilha = signal<Armadilha | undefined>(undefined);

  capturaId = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id'))
    )
  );

  captura = signal<Captura | undefined>(undefined);

  constructor(private api: ApiConnectionService, private location: Location) {
    effect((onCleanup) => {
      const idCaptura = this.capturaId();

      if (!idCaptura) {
        this.captura.set(undefined);
        this.armadilha.set(undefined);
        return;
      }

      const sub = this.api.findCaptura(idCaptura).pipe(
        switchMap(captura => {
          if (!captura?.armadilhaId) {
            this.armadilha.set(undefined);
            return of({ captura, armadilha: undefined });
          }

          return this.api.findArmadilha(captura.armadilhaId).pipe(
            map(armadilha => ({ captura, armadilha }))
          );
        })
      ).subscribe({
        next: ({ captura, armadilha }) => {
          this.captura.set(captura);
          this.armadilha.set(armadilha);
        },
        error: () => {
          this.captura.set(undefined);
          this.armadilha.set(undefined);
        }
      });

      onCleanup(() => sub.unsubscribe());
    });

  }

  goBack() {
    this.router.navigate(['/workspace/entities/capturas']);
  }

  voltar() {
    this.location.back();
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

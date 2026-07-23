import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Armadilha } from '../../armadilhas/armadilha.model';
import { Captura } from '../captura.model';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChip } from '@angular/material/chips';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize, map, of, switchMap } from 'rxjs';
import { ApiConnectionService } from '../../../../../../../../services/api-connection-service';
import { ConfirmDialogComponent } from '../../../../../../../shared/confirm-dialog-component/confirm-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from '../../../../../../../../services/permission-service';

@Component({
  selector: 'app-capturas-detail',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatChip, RouterModule],
  templateUrl: './capturas-detail.html',
  styleUrl: './capturas-detail.css',
})
export class CapturasDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  permissionService = inject(PermissionService)


  toastr = inject(ToastrService);
  loadingRemove = signal(false);
  armadilha = signal<Armadilha | undefined>(undefined);

  capturaId = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id'))
    )
  );

  captura = signal<Captura | undefined>(undefined);

  constructor(private api: ApiConnectionService, private location: Location, private dialog: MatDialog) {
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
    this.router.navigate(['/workspace/mosquitos/capturas']);
  }

  voltar() {
    this.location.back();
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        title: 'Excluir captura',
        message: 'Tem certeza que deseja continuar?',
        confirmText: 'Sim',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (!confirmado) return
      this.loadingRemove.set(true)

      this.api.removeCaptura(this.captura()?.id ?? '').pipe(
        finalize(() => this.loadingRemove.set(false))).subscribe({
          next: (result) => {
            this.showSuccess('Captura apagada!')
          },
          error: (error) => {
            this.showError(`Mensagem: ${error.error.message}`)
          }
        });
    })
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Sucesso!', { progressBar: true }).onHidden.subscribe(() => {
      this.voltar()
    });
  }

  showError(message: string) {
    this.toastr.error(message, 'Algo deu errado!', { progressBar: true }).onHidden.subscribe(() => {
      this.voltar()
    });
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

import { CommonModule, Location } from "@angular/common";
import { Component, inject, signal, effect } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatChip } from "@angular/material/chips";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { map, switchMap, of, finalize } from "rxjs";
import { ApiConnectionService } from "../../../../../../../../services/api-connection-service";
import { ConfirmDialogComponent } from "../../../../../../../shared/confirm-dialog-component/confirm-dialog-component";
import { ArmadilhaCarrapato } from "../../armadilhas/armadilha-carrapato.model";
import { CapturaCarrapato } from "../captura-carrapato.model";

@Component({
    selector: 'app-capturas-detail',
    imports: [CommonModule, MatButtonModule, MatIconModule, MatChip, RouterModule],
    templateUrl: './capturas-carrapato-detail.html',
    styleUrl: './capturas-carrapato-detail.css',
  })
  export class CapturasCarrapatosDetail {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
  
    toastr = inject(ToastrService);
    loadingRemove = signal(false);
    armadilha = signal<ArmadilhaCarrapato | undefined>(undefined);
  
    capturaId = toSignal(
      this.route.paramMap.pipe(
        map(params => params.get('id'))
      )
    );
  
    captura = signal<CapturaCarrapato | undefined>(undefined);
  
    constructor(private api: ApiConnectionService, private location: Location, private dialog: MatDialog) {
      effect((onCleanup) => {
        const idCaptura = this.capturaId();
  
        if (!idCaptura) {
          this.captura.set(undefined);
          this.armadilha.set(undefined);
          return;
        }
  
        const sub = this.api.findCapturaCarrapatos(idCaptura).pipe(
          switchMap(captura => {
            if (!captura?.armadilhaId) {
              this.armadilha.set(undefined);
              return of({ captura, armadilha: undefined });
            }
  
            return this.api.findArmadilhaCarrapatos(captura.armadilhaId).pipe(
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
      this.router.navigate(['/workspace/carrapatos/capturas-carrapatos']);
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

  
  }
  
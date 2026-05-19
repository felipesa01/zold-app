import { CommonModule, Location } from "@angular/common";
import { Component, inject, signal, effect } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatChip } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { finalize, map } from "rxjs";
import { ApiConnectionService } from "../../../../../../../services/api-connection-service";
import { Projeto } from "../projetos.model";
import { ToastrService } from "ngx-toastr";
import { ConfirmDialogComponent } from "../../../../../../shared/confirm-dialog-component/confirm-dialog-component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-projetos-detail',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatChip, RouterModule],
  templateUrl: './projetos-detail.html',
  styleUrl: './projetos-detail.css',
})
export class ProjetosDetail {

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  toastr = inject(ToastrService);
  loadingRemove = signal(false);

  projetoId = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id')))
  );

  projeto = signal<Projeto | undefined>(undefined);

  constructor(private api: ApiConnectionService, private location: Location, private dialog: MatDialog) {
    effect((onCleanup) => {
      const id = this.projetoId();

      if (!id) {
        this.projeto.set(undefined);
        return;
      }

      const sub = this.api.findProjeto(id).subscribe({
        next: p => this.projeto.set(p),
        error: () => this.projeto.set(undefined)
      });

      onCleanup(() => sub.unsubscribe());
    });
  }

  voltar() {
    this.location.back();
  }

  statusColor(status: string) {
    return status === 'ATIVO' ? 'primary' : 'warn';
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        title: 'Excluir projeto',
        message: 'Tem certeza que deseja continuar?',
        confirmText: 'Sim',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (!confirmado) return
      this.loadingRemove.set(true)

      this.api.removeProjeto(this.projetoId() ?? '').pipe(
        finalize(() => this.loadingRemove.set(false))).subscribe({
          next: (result) => {
            this.showSuccess('Projeto apagado!')
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
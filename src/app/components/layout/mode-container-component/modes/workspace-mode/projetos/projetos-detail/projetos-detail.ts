import { CommonModule, Location } from "@angular/common";
import { Component, inject, signal, effect } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatChip } from "@angular/material/chips";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { map, finalize } from "rxjs";
import { ApiConnectionService, ProjetoServico, ProjetoServicosAtivos, ProjetoServicosDisponiveis } from "../../../../../../../services/api-connection-service";
import { ConfirmDialogComponent } from "../../../../../../shared/confirm-dialog-component/confirm-dialog-component";
import { Projeto } from "../projetos.model";
import { PermissionService } from "../../../../../../../services/permission-service";

@Component({
  selector: 'app-projetos-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatChip,
    MatSlideToggleModule
  ],
  templateUrl: './projetos-detail.html',
  styleUrl: './projetos-detail.css',
})
export class ProjetosDetail {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  permissionService = inject(PermissionService)

  toastr = inject(ToastrService);

  loadingRemove = signal(false);

  projetoId = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id'))
    )
  );

  projeto = signal<Projeto | undefined>(undefined);

  servicosDisponiveis = signal<
    ProjetoServicosDisponiveis | undefined
  >(undefined);

  servicosAtivos = signal<
    ProjetoServicosAtivos | undefined
  >(undefined);

  constructor(
    private api: ApiConnectionService,
    private location: Location,
    private dialog: MatDialog
  ) {

    effect((onCleanup) => {

      const id = this.projetoId();

      if (!id) {
        this.projeto.set(undefined);
        return;
      }

      const projetoSub = this.api
        .findProjeto(id)
        .subscribe({
          next: (p) => this.projeto.set(p),
          error: () => this.projeto.set(undefined)
        });

      const servicosDisponiveisSub = this.api
        .findProjetoServicos(id)
        .subscribe({
          next: (result) => {
            const sorted = result.servicos.sort((a, b) => a.nome.localeCompare(b.nome))
            result.servicos = sorted
            this.servicosDisponiveis.set(result);
          }
        });

      const servicosAtivosSub = this.api
        .getServicosByProject_new(id)
        .subscribe({
          next: (result) => {
            const sorted = result.servicosAtivos.sort((a, b) => a.nome.localeCompare(b.nome))
            result.servicosAtivos = sorted
            this.servicosAtivos.set(result);
          }
        });

      onCleanup(() => {
        projetoSub.unsubscribe();
        servicosDisponiveisSub.unsubscribe();
        servicosAtivosSub.unsubscribe();
      });

    });

  }

  voltar() {
    this.location.back();
  }

  statusColor(status: string) {
    return status === 'ATIVO'
      ? 'primary'
      : 'warn';
  }

  isServicoHabilitado(
    servicoId: string
  ): boolean {

    const ativos =
      this.servicosAtivos()?.servicosAtivos ?? [];

    return ativos.some(
      servico => servico.id === servicoId
    );

  }

  toggleServico(
    servico: ProjetoServico,
    enabled: boolean
  ) {

    const request = enabled
      ? this.api.enableProjetoServico(
          this.projetoId() ?? '',
          servico.id
        )
      : this.api.disableProjetoServico(
          this.projetoId() ?? '',
          servico.id
        );

    request.subscribe({

      next: () => {

        const atuais =
          this.servicosAtivos()?.servicosAtivos ?? [];

        if (enabled) {

          this.servicosAtivos.set({
            projetoId: this.projetoId() ?? '',
            servicosAtivos: [
              ...atuais,
              servico
            ]
          });

        } else {

          this.servicosAtivos.set({
            projetoId: this.projetoId() ?? '',
            servicosAtivos: atuais.filter(
              s => s.id !== servico.id
            )
          });

        }

        this.toastr.success(
          enabled
            ? 'Serviço habilitado'
            : 'Serviço desabilitado',
          'Sucesso!',
          { progressBar: true }
        );

      },

      error: () => {

        this.toastr.error(
          'Não foi possível atualizar o serviço',
          'Erro',
          { progressBar: true }
        );

      }

    });

  }

  delete() {

    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        width: '360px',
        data: {
          title: 'Excluir projeto',
          message: 'Tem certeza que deseja continuar?',
          confirmText: 'Sim',
          cancelText: 'Cancelar'
        }
      }
    );

    dialogRef.afterClosed().subscribe(confirmado => {

      if (!confirmado) return;

      this.loadingRemove.set(true);

      this.api.removeProjeto(this.projetoId() ?? '')
        .pipe(
          finalize(() => this.loadingRemove.set(false))
        )
        .subscribe({
          next: () => {
            this.showSuccess('Projeto apagado!');
          },
          error: (error) => {
            this.showError(
              `Mensagem: ${error.error.message}`
            );
          }
        });

    });

  }

  showSuccess(message: string) {

    this.toastr.success(
      message,
      'Sucesso!',
      { progressBar: true }
    ).onHidden.subscribe(() => {
      this.voltar();
    });

  }

  showError(message: string) {

    this.toastr.error(
      message,
      'Algo deu errado!',
      { progressBar: true }
    );

  }

}
import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiConnectionService } from '../../../../../../../../services/api-connection-service';
import { ConfirmDialogComponent } from '../../../../../../../shared/confirm-dialog-component/confirm-dialog-component';
import { AnaliseInventario } from '../analise.model';
import { RecomendacaoInventario } from '../../recomendacoes/recomendacoes.model';
import { MatIconModule } from '@angular/material/icon';
import { ImageUploadComponent } from '../../../../../../../shared/image-upload/image-upload.component';
import { Exemplar } from '../../exemplares/exemplar.model';
import { finalize, forkJoin, Observable, of, switchMap } from 'rxjs';


@Component({
  selector: 'app-analise-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    ImageUploadComponent
  ],
  templateUrl: './analises-form.html',
  styleUrls: ['./analises-form.css']
})
export class AnaliseForm implements OnInit {

  private fb = inject(FormBuilder);
  private api = inject(ApiConnectionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);

  loading = signal(false);
  loadingSave = signal(false);

  exemplar = signal<Exemplar | null>(null);
  exemplarId = signal<string | null>(null);
  analiseId = signal<string | null>(null);

  isEditMode = computed(() => !!this.analiseId());

  analise = signal<AnaliseInventario | null>(null);
  private recomendacoesRemovidas: string[] = [];

  form!: FormGroup;

  ngOnInit(): void {

    this.form = this.fb.group({
      data: ['', Validators.required],
      dap: [null],
      altura: [null],
      copa_descricao: [''],
      tronco_descricao: [''],
      sistema_radicular_descricao: [''],
      ataque_praga: [false],
      ataque_fungo: [false],
      ataque_bacteria: [false],
      deficiencia_nutricional: [false],
      relatorio: [''],
      recomendacoes: this.fb.array([])

    });

    this.checkMode();

  }

  get recomendacoes(): FormArray {
    return this.form.get('recomendacoes') as FormArray;
  }

  createRecomendacaoGroup(rec?: RecomendacaoInventario): FormGroup {

    return this.fb.group({

      id: [rec?.id],
      titulo: [rec?.titulo ?? '', Validators.required],
      descricao: [rec?.descricao ?? ''],
      status: [rec?.status ?? 'PENDENTE']

    });

  }

  addRecomendacao(rec?: RecomendacaoInventario): void {
    this.recomendacoes.push(
      this.createRecomendacaoGroup(rec)
    );

  }
  
  removeRecomendacao(index: number): void {

    const rec = this.recomendacoes.at(index).value;
  
    if (rec.id) {
      this.recomendacoesRemovidas.push(rec.id);
    }
  
    this.recomendacoes.removeAt(index);
  
  }

  private checkMode(): void {

    this.exemplarId.set(
      this.route.snapshot.paramMap.get('exemplarId')
    );

    this.analiseId.set(
      this.route.snapshot.paramMap.get('id')
    );

    if (this.isEditMode()) {
      this.loadAnalise(this.analiseId()!);
    }
    else {
      this.api.findExemplar(this.exemplarId()!).subscribe(exemplar => {
        this.exemplar.set(exemplar);
      });
    }

  }

  private loadAnalise(id: string): void {

    this.loading.set(true);

    this.api.findAnaliseInventario(id)
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({

        next: analise => {

          this.analise.set(analise);
          this.exemplarId.set(analise.exemplarId);

          this.form.patchValue({
            data: analise.data?.split('T')[0],
            dap: analise.dap,
            altura: analise.altura,
            copa_descricao: analise.copa_descricao,
            tronco_descricao: analise.tronco_descricao,
            sistema_radicular_descricao: analise.sistema_radicular_descricao,
            ataque_praga: analise.ataque_praga,
            ataque_fungo: analise.ataque_fungo,
            ataque_bacteria: analise.ataque_bacteria,
            deficiencia_nutricional: analise.deficiencia_nutricional,
            relatorio: analise.relatorio
          });

          this.recomendacoes.clear();

            analise.recomendacoes?.forEach(r =>
              this.addRecomendacao(r)
            );

        }

      });

  }

  apply(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    const payload = this.form.getRawValue();
    const recomendacoes = payload.recomendacoes;
  
    delete payload.recomendacoes;
    payload.exemplarId = this.exemplarId();
  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        title: this.isEditMode() ? 'Editar análise' : 'Nova análise',
        message: 'Deseja continuar?',
        confirmText: 'Salvar',
        cancelText: 'Cancelar'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
  
      if (!result) return;
  
      this.loadingSave.set(true);
  
      const request = this.isEditMode()
        ? this.api.updateAnaliseInventario(this.analiseId()!, payload)
        : this.api.addAnaliseInventario(payload);
  
      request.pipe(
        switchMap(analise => this.syncRecomendacoes(analise.id, recomendacoes)),
        finalize(() => this.loadingSave.set(false))
      ).subscribe({
  
        next: () => {
          this.toastr.success('Análise salva com sucesso.');
          this.location.back();
        },
  
        error: err => {
          this.toastr.error(err?.error?.message ?? 'Erro ao salvar análise.');
        }
  
      });
  
    });
  
  }

  private syncRecomendacoes(analiseId: string, recomendacoes: any[]): Observable<any> {

    const requests: Observable<any>[] = [];
  
    recomendacoes.forEach(rec => {
  
      const payload = {
        titulo: rec.titulo,
        descricao: rec.descricao
      };
  
      if (rec.id) {
        requests.push(this.api.updateRecomendacaoInventario(rec.id, {
          ...payload,
          status: rec.status
        }));
      } else {
        requests.push(this.api.addRecomendacaoInventario({
          ...payload,
          analiseId
        }));
      }
  
    });
  
    this.recomendacoesRemovidas.forEach(id => {
      requests.push(this.api.deleteRecomendacaoInventario(id));
    });
  
    if (!requests.length) {
      return of(null);
    }
  
    return forkJoin(requests);
  
  }
  // apply(): void {

  //   if (this.form.invalid) {

  //     this.form.markAllAsTouched();

  //     return;

  //   }

  //   const payload = this.form.getRawValue();

  //   payload.exemplarId = this.exemplarId();

  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {

  //     width: '360px',

  //     data: {

  //       title: this.isEditMode()
  //         ? 'Editar análise'
  //         : 'Nova análise',

  //       message: 'Deseja continuar?',

  //       confirmText: 'Salvar',

  //       cancelText: 'Cancelar'

  //     }

  //   });

  //   dialogRef.afterClosed().subscribe(result => {

  //     if (!result) return;

  //     this.loadingSave.set(true);

  //     const request = this.isEditMode()

  //       ? this.api.updateAnaliseInventario(
  //         this.analiseId()!,
  //         payload
  //       )

  //       : this.api.addAnaliseInventario(payload);

  //     request.pipe(

  //       finalize(() =>
  //         this.loadingSave.set(false)
  //       )

  //     ).subscribe({

  //       next: () => {

  //         this.toastr.success(
  //           'Análise salva com sucesso.'
  //         );

  //         this.location.back();

  //       },

  //       error: err => {

  //         this.toastr.error(
  //           err?.error?.message ??
  //           'Erro ao salvar análise.'
  //         );

  //       }

  //     });

  //   });

  // }

  voltar(): void {

    this.location.back();

  }

  hasError(control: string, error: string): boolean {

    const c = this.form.get(control);

    return !!(
      c &&
      c.touched &&
      c.hasError(error)
    );

  }

}
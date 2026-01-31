import { Component, OnInit, signal, computed, ViewChild, effect, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, Subject, catchError, debounceTime, distinctUntilChanged, filter, finalize, map, merge, of, switchMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiConnectionService } from '../../../../../../../../services/api-connection-service';
import { ProjectContextService } from '../../../../../../../../services/project-context.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Armadilha } from '../../armadilhas/armadilha.model';
import { Captura, CreateCaptura } from '../captura.model';
import { datePureToUTCString } from '../../../../../../../../utils/date-pure-to-UTC';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../../../shared/confirm-dialog-component/confirm-dialog-component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-capturas-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbTypeaheadModule, MatIconModule, MatButtonModule, MatInputModule, MatProgressSpinnerModule],
  templateUrl: './capturas-form.html',
  styleUrls: ['./capturas-form.css']
})
export class CapturasForm implements OnInit {

  readonly USER_ID_FIXO = '1d6429ae-130c-4500-b602-9b70bbad17c6';

  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;

  toastr = inject(ToastrService);

  private route = inject(ActivatedRoute);
  private projectContext = inject(ProjectContextService);
  selectedProject = this.projectContext.selected;
  private selectedProject$ = toObservable(this.selectedProject);

  private api = inject(ApiConnectionService);

  isEditMode = signal(false);
  capturaId: string | null = null;

  form!: FormGroup;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  loadingSave = signal(false);
  loading = signal(false);
  private armadilhas$ = toSignal(
    this.selectedProject$.pipe(
      switchMap(project => {
        if (!project) return of([] as Armadilha[]);

        this.loading.set(true);

        return this.api.listarArmadilhasByProjeto(project.id).pipe(
          catchError(() => of([])),
          finalize(() => this.loading.set(false))
        );
      })
    ),
    { initialValue: [] as Armadilha[] }
  );
  armadilhas = computed(() => this.armadilhas$());

  captura = signal<Captura | null>(null);

  // private armadilhas = signal<Armadilha[]>([]);

  constructor(private fb: FormBuilder, private router: Router, private location: Location, private dialog: MatDialog) {
    effect(() => {
      if (!this.isEditMode()) return;

      const armadilhaId = this.form.get('armadilhaId')?.value;
      const lista = this.armadilhas();

      if (!armadilhaId || lista.length === 0) return;

      this.preencherArmadilhaSelecionada(armadilhaId);
    });
  }

  goBack() {
    this.router.navigate(['/workspace/entities/capturas']);
  }

  voltar() {
    this.location.back();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      data: ['', Validators.required],
      situacaoFisica: ['REGULAR', Validators.required],
      status: ['ATIVA', Validators.required],

      numAedes: [0, Validators.required],
      numCulex: [0, Validators.required],
      numOutras: [0, Validators.required],
      numTotal: [{ value: 0, disabled: true }],

      trocaRefil: [false],
      trocaAtrativo: [false],

      userId: [this.USER_ID_FIXO],
      armadilhaId: ['', Validators.required],
      armadilhaDisplay: ['', Validators.required


      ]
    });

    // this.carregarArmadilhas();
    this.configurarRegras();
    this.checkEditMode();
  }

  hasError(control: string, error: string) {
    const c = this.form.get(control);
    return !!(c && c.touched && c.hasError(error));
  }

  checkEditMode() {
    this.capturaId = this.route.snapshot.paramMap.get('id');

    if (!this.capturaId) return;

    this.isEditMode.set(true);
    this.loadCaptura(this.capturaId);
  }

  loadCaptura(id: string) {
    this.loading.set(true);

    this.api.findCaptura(id).subscribe({
      next: captura => {

        this.captura.set(captura)

        const dataFormatada = captura.data
          ? captura.data.split('T')[0]
          : '';

        this.form.patchValue({
          data: dataFormatada,
          situacaoFisica: captura.situacaoFisica,
          status: captura.status,
          numAedes: captura.numAedes,
          numCulex: captura.numCulex,
          numOutras: captura.numOutras,
          trocaRefil: captura.trocaRefil,
          trocaAtrativo: captura.trocaAtrativo,
          armadilhaId: captura.armadilhaId
        });
      },
      error: () => console.error('Erro ao carregar captura'),
      complete: () => this.loading.set(false)
    });
  }

  /** Função do Typeahead */
  search: OperatorFunction<string, readonly Armadilha[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );

    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );

    const inputFocus$ = this.focus$;


    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => {
        const lista = this.armadilhas();

        return term === ''
          ? lista.slice(0, 10)
          : lista.filter(a =>
            a.nome.toLowerCase().includes(term.toLowerCase()) ||
            a.referencia.toLowerCase().includes(term.toLowerCase())
          ).slice(0, 10);
      })
    );
  };


  /** Como o item aparece no input */
  formatter = (a: Armadilha) => {
    console.log('Armadilha no formmater')
    return `${a.nome} — ${a.referencia}`
  }

  resultFormatter = (a: Armadilha) =>
    `${a.nome} — ${a.referencia}`;

  inputFormatter = (a: Armadilha | string) => {
    if (typeof a === 'string') return a;
    return `${a.nome} — ${a.referencia}`;
  };

  /** Ao selecionar */
  onSelect(event: any) {
    this.form.get('armadilhaId')?.setValue(event.item.id);
  }

  preencherArmadilhaSelecionada(id: string) {
    const lista = this.armadilhas();
    const arm = lista.find(a => a.id === id);

    if (!arm) {
      console.warn('Armadilha não encontrada ainda');
      return;
    }

    const label = this.resultFormatter(arm);

    this.form.get('armadilhaDisplay')?.setValue(label);
  }

  configurarRegras() {
    merge(
      this.form.get('numAedes')!.valueChanges,
      this.form.get('numCulex')!.valueChanges,
      this.form.get('numOutras')!.valueChanges
    ).subscribe(() => {
      const total =
        (this.form.get('numAedes')!.value ?? 0) +
        (this.form.get('numCulex')!.value ?? 0) +
        (this.form.get('numOutras')!.value ?? 0);

      this.form.get('numTotal')!.setValue(total, { emitEvent: false });
    });

    this.form.get('situacaoFisica')!.valueChanges.subscribe(situacao => {
      if (situacao === 'EXTRAVIADA') {
        this.form.get('status')!.setValue('INATIVA');
      }
    });

    this.form.get('status')!.valueChanges.subscribe(status => {
      if (status === 'INATIVA') {
        this.form.get('numAedes')!.disable();
        this.form.get('numCulex')!.disable();
        this.form.get('numOutras')!.disable();

        this.form.get('numAedes')!.setValue(0);
        this.form.get('numCulex')!.setValue(0);
        this.form.get('numOutras')!.setValue(0);
      } else {
        this.form.get('situacaoFisica')!.setValue('REGULAR');
        this.form.get('numAedes')!.enable();
        this.form.get('numCulex')!.enable();
        this.form.get('numOutras')!.enable();
      }
    });
  }



  apply() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue() as Captura;
    payload.data = datePureToUTCString(payload.data)

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        title: this.isEditMode() ? 'Editar captura' : 'Inserir captura',
        message: 'Tem certeza que deseja continuar?',
        confirmText: 'Sim',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (!confirmado) return
      this.loadingSave.set(true)
      if (this.isEditMode()) {
        this.api.updateCaptura(this.captura()?.id as string, payload as CreateCaptura).pipe(
          finalize(() => this.loadingSave.set(false))).subscribe({
            next: (result) => {
              this.showSuccess('As alterações foram salvas com sucesso!')
            },
            error: (error) => {
              const msg = error?.error?.message || 'Erro inesperado ao salvar.';
              this.showError(`Mensagem: ${msg}`)
            }
          });
      } else {
        this.api.addCaptura(payload).pipe(
          finalize(() => this.loadingSave.set(false))).subscribe({
            next: (result) => {
              this.showSuccess('A captura foi salva com sucesso!')
            },
            error: (error) => {
              const msg = error?.error?.message || 'Erro inesperado ao salvar.';
              this.showError(`Mensagem: ${msg}`)
            }
          });
      }

    });


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

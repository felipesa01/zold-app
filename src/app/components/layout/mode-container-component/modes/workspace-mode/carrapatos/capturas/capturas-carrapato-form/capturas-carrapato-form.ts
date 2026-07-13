import { CommonModule, Location } from "@angular/common";
import { Component, OnInit, ViewChild, inject, signal, computed, effect } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbTypeaheadModule, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subject, switchMap, of, catchError, finalize, OperatorFunction, Observable, debounceTime, distinctUntilChanged, filter, merge, map } from "rxjs";
import { ApiConnectionService } from "../../../../../../../../services/api-connection-service";
import { ProjectContextService } from "../../../../../../../../services/project-context.service";
import { datePureToUTCString } from "../../../../../../../../utils/date-pure-to-UTC";
import { ConfirmDialogComponent } from "../../../../../../../shared/confirm-dialog-component/confirm-dialog-component";
import { ArmadilhaCarrapato } from "../../armadilhas/armadilha-carrapato.model";
import { CapturaCarrapato, CreateCapturaCarrapato } from "../captura-carrapato.model";


@Component({
    selector: 'app-capturas-carrapatos-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, NgbTypeaheadModule, MatIconModule, MatButtonModule, MatInputModule, MatProgressSpinnerModule],
    templateUrl: './capturas-carrapato-form.html',
    styleUrls: ['./capturas-carrapato-form.css']
  })
  export class CapturasCarrapatosForm implements OnInit {
  
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
          if (!project) return of([] as ArmadilhaCarrapato[]);
  
          this.loading.set(true);
  
          return this.api.listarArmadilhasCarrapatosByProjeto(project.id).pipe(
            catchError(() => of([])),
            finalize(() => this.loading.set(false))
          );
        })
      ),
      { initialValue: [] as ArmadilhaCarrapato[] }
    );
    armadilhas = computed(() => this.armadilhas$());
  
    captura = signal<CapturaCarrapato | null>(null);
  
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
      this.router.navigate(['/workspace/carrapatos/capturas-carrapatos']);
    }
  
    voltar() {
      this.location.back();
    }
  
    ngOnInit(): void {
      this.form = this.fb.group({
        data: ['', Validators.required],
  
        numNinfa: [0, Validators.required],
        numLarva: [0, Validators.required],
        numAdulto: [0, Validators.required],
        numTotal: [{ value: 0, disabled: true }],
  
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
  
      this.api.findCapturaCarrapatos(id).subscribe({
        next: captura => {
  
          this.captura.set(captura)
  
          const dataFormatada = captura.data
            ? captura.data.split('T')[0]
            : '';
  
          this.form.patchValue({
            data: dataFormatada,
            numLarva: captura.numLarva,
            numNinfa: captura.numNinfa,
            numAdulto: captura.numAdulto,
            armadilhaId: captura.armadilhaId
          });
        },
        error: () => console.error('Erro ao carregar captura'),
        complete: () => this.loading.set(false)
      });
    }
  
    /** Função do Typeahead */
    search: OperatorFunction<string, readonly ArmadilhaCarrapato[]> = (text$: Observable<string>) => {
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
    formatter = (a: ArmadilhaCarrapato) => {
      console.log('Armadilha no formmater')
      return `${a.nome}`
    }
  
    resultFormatter = (a: ArmadilhaCarrapato) =>
      `${a.nome} — ${a.referencia}`;
  
    inputFormatter = (a: ArmadilhaCarrapato | string) => {
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
        this.form.get('numNinfa')!.valueChanges,
        this.form.get('numLarva')!.valueChanges,
        this.form.get('numAdulto')!.valueChanges
      ).subscribe(() => {
        const total =
          (this.form.get('numNinfa')!.value ?? 0) +
          (this.form.get('numLarva')!.value ?? 0) +
          (this.form.get('numAdulto')!.value ?? 0);
  
        this.form.get('numTotal')!.setValue(total, { emitEvent: false });
      });

    }
  
  
  
    apply() {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
  
      const payload = this.form.getRawValue() as CapturaCarrapato;
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
          this.api.updateCapturaCarrapatos(this.captura()?.id as string, payload as CreateCapturaCarrapato).pipe(
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
          this.api.addCapturaCarrapatos(payload).pipe(
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
  
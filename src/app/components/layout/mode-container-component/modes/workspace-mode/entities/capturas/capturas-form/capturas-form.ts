import { Component, OnInit, signal, computed, ViewChild, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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


@Component({
  selector: 'app-capturas-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbTypeaheadModule, MatIconModule, MatButtonModule, MatInputModule],
  templateUrl: './capturas-form.html',
  styleUrls: ['./capturas-form.css']
})
export class CapturasForm implements OnInit {

  readonly USER_ID_FIXO = '1d6429ae-130c-4500-b602-9b70bbad17c6';

  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;


  private projectContext = inject(ProjectContextService);
  selectedProject = this.projectContext.selected;
  private selectedProject$ = toObservable(this.selectedProject);

  isEditMode = signal(false);
  capturaId: string | null = null;

  private route = inject(ActivatedRoute);


  form!: FormGroup;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  private api = inject(ApiConnectionService);

  loading = signal(false);
  // private armadilhas$ = toSignal(
  //   this.selectedProject$.pipe(
  //     switchMap(project => {
  //       if (!project) return of([] as Armadilha[]);

  //       this.loading.set(true);

  //       return this.api.listarArmadilhasByProjeto(project.id).pipe(
  //         catchError(() => of([])),
  //         finalize(() => this.loading.set(false))
  //       );
  //     })
  //   ),
  //   { initialValue: [] as Armadilha[] }
  // );
  // armadilhas = computed(() => this.armadilhas$());

  private armadilhas = signal<Armadilha[]>([]);

  constructor(private fb: FormBuilder, private router: Router) {
    effect(() => {
      if (!this.isEditMode()) return;

      const armadilhaId = this.form.get('armadilhaId')?.value;

      if (!armadilhaId) return;

      this.preencherArmadilhaSelecionada(armadilhaId);
    });

    // Ajustar aqui. Primeiro pegar as armadilhas para depois chamar o preencherArmadilhaSelecionada
    effect(() => {
      const project = this.selectedProject();

      if (!project) {
        this.armadilhas.set([]);
        return;
      }

      this.loading.set(true);
      this.api.listarArmadilhasByProjeto(project.id).subscribe({
        next: data => {
          this.armadilhas.set([...data]);
          this.loading.set(false);
        },
        error: () => {
          this.armadilhas.set([]);
          this.loading.set(false);
        }
      });
    });

  }

  goBack() {
    this.router.navigate(['/workspace/entities/capturas']);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      data: ['', Validators.required],
      situacaoFisica: ['REGULAR', Validators.required],
      status: ['ATIVA', Validators.required],

      numAedes: [0],
      numCulex: [0],
      numOutras: [0],
      numTotal: [{ value: 0, disabled: true }],

      trocaRefil: [false],
      trocaAtrativo: [false],

      userId: [this.USER_ID_FIXO],
      armadilhaId: ['', Validators.required],
      armadilhaDisplay: ['']
    });

    // this.carregarArmadilhas();
    this.configurarRegras();
    this.checkEditMode();
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

        const dataFormatada = captura.data
          ? captura.data.split('T')[0]
          : '';

        console.log({
          data: dataFormatada,
          situacaoFisica: captura.situacaoFisica,
          status: captura.status,
          numAedes: captura.numAedes,
          numCulex: captura.numCulex,
          numOutras: captura.numOutras,
          trocaRefil: captura.trocaRefil,
          trocaAtrativo: captura.trocaAtrativo,
          armadilhaId: captura.armadilhaId
        })

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

        this.preencherArmadilhaSelecionada(captura.armadilhaId);
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
  formatter = (a: Armadilha) =>
    `${a.nome} — ${a.referencia}`;

  /** Ao selecionar */
  onSelect(event: any) {
    this.form.get('armadilhaId')?.setValue(event.item.id);
  }

  preencherArmadilhaSelecionada(id: string) {
    console.log(this.armadilhas())
    const arm = this.armadilhas().find(a => a.id === id);
    // console.log(arm)
    if (!arm) return;

    const label = this.formatter(arm);

    // acesso ao input host do ngbTypeahead
    const inputEl = (this.instance as any)?._elementRef?.nativeElement;

    if (inputEl) {
      inputEl.value = label;
    }
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
    if (this.form.invalid) return;

    const payload = this.form.getRawValue();

    if (this.isEditMode()) {
      console.log('Editar')
    } else {
      console.log('Criar')
    }
  }
}

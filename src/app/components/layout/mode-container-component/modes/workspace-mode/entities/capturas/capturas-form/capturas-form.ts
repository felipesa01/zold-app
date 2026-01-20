import { Component, OnInit, signal, computed, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

interface Armadilha {
  id: string;
  nome: string;
  referencia: string;
}

@Component({
  selector: 'app-capturas-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbTypeaheadModule,MatIconModule, MatButtonModule, MatInputModule],
  templateUrl: './capturas-form.html',
  styleUrls: ['./capturas-form.css']
})
export class CapturasForm implements OnInit {

  readonly USER_ID_FIXO = '1d6429ae-130c-4500-b602-9b70bbad17c6';

  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;

  armadilhas: Armadilha[] = [];
  form!: FormGroup;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(private fb: FormBuilder, private router: Router) { }

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
      armadilhaId: ['', Validators.required]
    });

    this.carregarArmadilhas();
    this.configurarRegras();
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
      map(term =>
        (term === ''
          ? this.armadilhas
          : this.armadilhas.filter(a =>
            a.nome.toLowerCase().includes(term.toLowerCase()) ||
            a.referencia.toLowerCase().includes(term.toLowerCase())
          )
        ).slice(0, 10)
      )
    );
  };


  /** Como o item aparece no input */
  formatter = (a: Armadilha) =>
    `${a.nome} — ${a.referencia}`;

  /** Ao selecionar */
  onSelect(event: any) {
    this.form.get('armadilhaId')?.setValue(event.item.id);
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

  carregarArmadilhas() {
    // mock temporário
    this.armadilhas = [
      { id: '1', nome: 'Armadilha Norte', referencia: 'Poste 12' },
      { id: '2', nome: 'Armadilha Sul', referencia: 'Escola Municipal' },
      { id: '1', nome: 'Armadilha Norte', referencia: 'Poste 12' },
      { id: '2', nome: 'Armadilha Sul', referencia: 'Escola Municipal' },
      { id: '1', nome: 'Armadilha Norte', referencia: 'Poste 12' },
      { id: '2', nome: 'Armadilha Sul', referencia: 'Escola Municipal' },
      { id: '1', nome: 'Armadilha Norte', referencia: 'Poste 12' },
      { id: '2', nome: 'Armadilha Sul', referencia: 'Escola Municipal' },
      { id: '1', nome: 'Armadilha Norte', referencia: 'Poste 12' },
      { id: '2', nome: 'Armadilha Sul', referencia: 'Escola Municipal' },
      { id: '1', nome: 'Armadilha Norte', referencia: 'Poste 12' },
      { id: '2', nome: 'Armadilha Sul', referencia: 'Escola Municipal' },
    ];
  }
}

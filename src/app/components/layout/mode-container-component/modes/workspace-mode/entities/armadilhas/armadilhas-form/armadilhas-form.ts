import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiConnectionService } from '../../../../../../../../services/api-connection-service';
import { Armadilha, CreateArmadilha } from '../armadilha.model';
import { ProjectContextService } from '../../../../../../../../services/project-context.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-armadilhas-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './armadilhas-form.html',
  styleUrls: ['./armadilhas-form.css']
})
export class ArmadilhasForm implements OnInit {

  toastr = inject(ToastrService);
  private projectContext = inject(ProjectContextService);
  selectedProject = this.projectContext.selected;

  private fb = inject(FormBuilder);
  private api = inject(ApiConnectionService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form!: FormGroup;

  loading = signal(false);
  isEditMode = signal(false);
  armadilhaId: string | null = null;

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.buildForm();
    this.checkEditMode();
  }

  buildForm() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      referencia: ['', Validators.required],
      regiao: ['', Validators.required],
      lat: [null, Validators.required],
      lon: [null, Validators.required]
    });
  }

  checkEditMode() {
    this.armadilhaId = this.route.snapshot.paramMap.get('id');

    if (!this.armadilhaId) return;

    this.isEditMode.set(true);
    this.loadArmadilha(this.armadilhaId);
  }

  loadArmadilha(id: string) {
    this.loading.set(true);

    this.api.findArmadilha(id).subscribe({
      next: armadilha => {
        this.form.patchValue({
          nome: armadilha.nome,
          referencia: armadilha.referencia,
          regiao: armadilha.regiao,
          lat: Number(armadilha.lat),
          lon: Number(armadilha.lon)
        });
      },
      error: () => console.error('Erro ao carregar armadilha'),
      complete: () => this.loading.set(false)
    });
  }

  goBack() {
    this.router.navigate(['/workspace/entities/armadilhas']);
  }

  voltar() {
    this.location.back();
  }

  apply() {
    if (this.form.invalid) return;

    const payload = this.form.getRawValue() as Armadilha;
    console.log('payload', payload)

    if (this.isEditMode()) {
      this.api.updateArmadilha(this.armadilhaId ?? '', payload as CreateArmadilha).subscribe({
        next: (result) => {
          this.showSuccess('As alterações foram salvas com sucesso!')
          console.log(result)
        },
        error: (error) => {
          this.showError(`Mensagem: ${error.error.message}`)
          console.log(error)
        }
      });
    } else {
      console.log('Criar', payload)
      this.api.addArmadilha({ ...payload, projetoId: this.selectedProject()?.id ?? '' }).subscribe({
        next: (result) => {
          this.showSuccess('A armadilha foi salva com sucesso!')
          console.log(result)
        },
        error: (error) => {
          this.showError(`Mensagem: ${error.error.message}`)
          console.log(error)
        }
      });
    }
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Sucesso!', {progressBar: true}).onHidden.subscribe(() => {
      this.voltar()
    });
  }

  showError(message: string) {
    this.toastr.error(message, 'Algo deu errado!', {progressBar: true}).onHidden.subscribe(() => {
      this.voltar()
    });
  }


  // create(payload: any) {
  //   this.api.criarArmadilha(payload).subscribe(() => {
  //     this.goBack();
  //   });
  // }

  // update(payload: any) {
  //   this.api.atualizarArmadilha(this.armadilhaId!, payload).subscribe(() => {
  //     this.goBack();
  //   });
  // }
}

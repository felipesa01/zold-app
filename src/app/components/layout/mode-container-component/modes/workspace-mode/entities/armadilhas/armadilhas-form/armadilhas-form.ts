import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiConnectionService } from '../../../../../../../../services/api-connection-service';
import { Armadilha, CreateArmadilha } from '../armadilha.model';
import { ProjectContextService } from '../../../../../../../../services/project-context.service';

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
          lat: armadilha.lat,
          lon: armadilha.lon
        });
      },
      error: () => console.error('Erro ao carregar armadilha'),
      complete: () => this.loading.set(false)
    });
  }

  goBack() {
    this.router.navigate(['/workspace/entities/armadilhas']);
  }

  apply() {
    if (this.form.invalid) return;

    const payload = this.form.getRawValue() as Armadilha;
    console.log('payload', payload)

    if (this.isEditMode()) {
      this.api.updateArmadilha(this.armadilhaId ?? '', payload as CreateArmadilha).subscribe({
        next: (result) => {
          console.log('Feito!')
          console.log(result)
        },
        error: (error) => {
          console.log('Erro!')
          console.log(error)
        }
      });
    } else {
      console.log('Criar', payload)
      this.api.addArmadilha({...payload, projetoId: this.selectedProject()?.id ?? ''}).subscribe({
        next: (result) => {
          console.log('Feito!')
          console.log(result)
        },
        error: (error) => {
          console.log('Erro!')
          console.log(error)
        }
      });
    }
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

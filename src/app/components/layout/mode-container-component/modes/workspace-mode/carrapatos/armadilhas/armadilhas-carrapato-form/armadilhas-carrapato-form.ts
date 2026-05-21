import { CommonModule, Location } from "@angular/common";
import { Component, OnInit, inject, signal } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { finalize } from "rxjs";
import { ApiConnectionService } from "../../../../../../../../services/api-connection-service";
import { ProjectContextService } from "../../../../../../../../services/project-context.service";
import { ConfirmDialogComponent } from "../../../../../../../shared/confirm-dialog-component/confirm-dialog-component";
import { CreateArmadilha } from "../../../mosquitos/armadilhas/armadilha.model";
import { ArmadilhaCarrapato } from "../armadilha-carrapato.model";

@Component({
  selector: 'app-armadilhas-carrapatos-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './armadilhas-carrapato-form.html',
  styleUrl: './armadilhas-carrapato-form.css'
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
  loadingSave = signal(false);
  isEditMode = signal(false);
  armadilhaId: string | null = null;

  constructor(private location: Location, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.buildForm();
    this.checkEditMode();
  }

  buildForm() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      referencia: ['', Validators.required],
      regiao: ['', Validators.required],
      lat: [null, [Validators.required, Validators.min(-90), Validators.max(90)]],
      lon: [null, [Validators.required, Validators.min(-180), Validators.max(180)]],
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

    this.api.findArmadilhaCarrapatos(id).subscribe({
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
    this.router.navigate(['/workspace/carrapatos/armadilhas']);
  }

  voltar() {
    this.location.back();
  }

  onCoordinateInput(control: 'lat' | 'lon', event: Event) {
    const input = event.target as HTMLInputElement;

    // só troca vírgula por ponto e remove lixo
    let value = input.value
      .replace(',', '.')
      .replace(/[^0-9.-]/g, '');

    this.form.get(control)?.setValue(value, { emitEvent: false });
  }

  hasError(control: string, error: string) {
    const c = this.form.get(control);
    return !!(c && c.touched && c.hasError(error));
  }

  apply() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue() as ArmadilhaCarrapato;
    payload.lat = Number(payload.lat)
    payload.lon = Number(payload.lon)

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        title: this.isEditMode() ? 'Editar armadilha' : 'Inserir armadilha',
        message: 'Tem certeza que deseja continuar?',
        confirmText: 'Sim',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (!confirmado) return
      this.loadingSave.set(true)
      if (this.isEditMode()) {
        this.api.updateArmadilhCarrapatos(this.armadilhaId ?? '', payload as CreateArmadilha).pipe(
          finalize(() => this.loadingSave.set(false))).subscribe({
            next: (result) => {
              this.showSuccess('As alterações foram salvas com sucesso!')
            },
            error: (error) => {
              this.showError(`Mensagem: ${error.error.message}`)
            }
          });
      } else {
        this.api.addArmadilhaCarrapatos({ ...payload, projetoId: this.selectedProject()?.id ?? '' }).pipe(
          finalize(() => this.loadingSave.set(false))).subscribe({
            next: (result) => {
              this.showSuccess('A armadilha foi salva com sucesso!')
            },
            error: (error) => {
              this.showError(`Mensagem: ${error.error.message}`)
            }
          });
      }
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

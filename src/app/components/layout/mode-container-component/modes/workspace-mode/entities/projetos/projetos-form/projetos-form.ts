import { CommonModule, Location } from "@angular/common";
import { Component, OnInit, inject, signal } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiConnectionService } from "../../../../../../../../services/api-connection-service";
import { ConfirmDialogComponent } from "../../../../../../../shared/confirm-dialog-component/confirm-dialog-component";
import { Projeto } from "../projetos.model";
import { ProjectContextService } from "../../../../../../../../services/project-context.service";

@Component({
  selector: 'app-projetos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './projetos-form.html',
  styleUrls: ['./projetos-form.css']
})
export class ProjetosForm implements OnInit {

  private api = inject(ApiConnectionService);
  private route = inject(ActivatedRoute);
  private projectContext = inject(ProjectContextService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  toastr = inject(ToastrService);

  isEditMode = signal(false);
  projeto = signal<Projeto | null>(null);
  loadingSave = signal(false);

  form!: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) { }

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      status: ['ATIVO', Validators.required],
      responsavel: ['', [Validators.required, Validators.minLength(3)]],

      lat: [null, [Validators.required, Validators.min(-90), Validators.max(90)]],
      lon: [null, [Validators.required, Validators.min(-180), Validators.max(180)]],

      cep: ['', [
        Validators.required,
        Validators.pattern(/^\d{5}-?\d{3}$/)
      ]],

      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      cidade: ['', Validators.required],

      uf: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2)
      ]]
    });

    this.checkEditMode();
  }

  onCoordinateInput(control: 'lat' | 'lon', event: Event) {
    const input = event.target as HTMLInputElement;

    // só troca vírgula por ponto e remove lixo
    let value = input.value
      .replace(',', '.')
      .replace(/[^0-9.-]/g, '');

    this.form.get(control)?.setValue(value, { emitEvent: false });
  }

  onCepInput(event: Event) {
    const input = event.target as HTMLInputElement;

    // remove tudo que não for número
    let value = input.value.replace(/\D/g, '');

    // limita a 8 dígitos
    value = value.substring(0, 8);

    // aplica máscara 12345-678
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d{0,3})/, '$1-$2');
    }

    // atualiza o form sem disparar loop
    this.form.get('cep')?.setValue(value, { emitEvent: false });
  }

  hasError(control: string, error: string) {
    const c = this.form.get(control);
    return !!(c && c.touched && c.hasError(error));
  }

  voltar() {
    this.location.back();
  }

  checkEditMode() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.isEditMode.set(true);

    this.api.findProjeto(id).subscribe(p => {
      this.projeto.set(p);
      this.form.patchValue({
        nome: p.nome,
        status: p.status,
        responsavel: p.responsavel,
        lat: Number(p.lat),
        lon: Number(p.lon),
        logradouro: p.logradouro,
        numero: p.numero,
        complemento: p.complemento,
        cep: p.cep,
        cidade: p.cidade,
        uf: p.uf
      });
    });
  }

  apply() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();
    payload.cep = (payload.cep as string).replace("-", "")
    payload.lat = Number(payload.lat)
    payload.lon = Number(payload.lon)


    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        title: this.isEditMode() ? 'Editar projeto' : 'Criar projeto',
        message: 'Deseja continuar?',
        confirmText: 'Sim',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (!ok) return;

      this.loadingSave.set(true);

      const req = this.isEditMode()
        ? this.api.updateProjeto(this.projeto()?.id!, payload)
        : this.api.addProjeto(payload);

      req.subscribe({
        next: () => {
          this.reloadProjetos()
          this.showSuccess('Projeto salvo com sucesso!')},
        error: () => this.showError('Algo deu errado!'),
        complete: () => this.loadingSave.set(false)
      });
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

  reloadProjetos() {
    this.api.listarProjetos().subscribe(projects => {
      this.projectContext.setProjects(projects);
    });
  }

}

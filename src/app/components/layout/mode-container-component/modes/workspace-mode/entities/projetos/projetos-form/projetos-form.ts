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
      nome: ['', Validators.required],
      status: ['ATIVO', Validators.required],
      responsavel: ['', Validators.required],
      lat: [null],
      lon: [null],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      cep: [''],
      cidade: [''],
      uf: ['']
    });

    this.checkEditMode();
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
    if (this.form.invalid) return;

    const payload = this.form.getRawValue();

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
        next: () => this.showSuccess(),
        error: () => this.showError(),
        complete: () => this.loadingSave.set(false)
      });
    });
  }

  showSuccess() {
    this.toastr.success('Projeto salvo com sucesso!', 'Sucesso!')
      .onHidden.subscribe(() => this.voltar());
  }

  showError() {
    this.toastr.error('Erro ao salvar projeto', 'Erro!')
      .onHidden.subscribe(() => this.voltar());
  }
}

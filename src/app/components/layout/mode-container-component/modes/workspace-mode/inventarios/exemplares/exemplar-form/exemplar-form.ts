import { CommonModule, Location } from '@angular/common';
import { Component, inject, Input, OnInit, signal, TemplateRef } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ToastrService } from 'ngx-toastr';
import { ApiConnectionService } from '../../../../../../../../services/api-connection-service';
import { ProjectContextService } from '../../../../../../../../services/project-context.service';
import { ConfirmDialogComponent } from '../../../../../../../shared/confirm-dialog-component/confirm-dialog-component';
import { Exemplar } from '../exemplar.model';
import { ImageUploadComponent } from '../../../../../../../shared/image-upload/image-upload.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FotoInventario } from '../../fotos/fotos.model';
import { MapLocationComponent } from '../../../../../../../shared/map-location/map-location.component';


@Component({
    selector: 'app-exemplares-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        ImageUploadComponent,
        NgbCarouselModule,
        MapLocationComponent,
        MatDialogModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './exemplar-form.html',
    styleUrls: ['./exemplar-form.css']
})
export class ExemplaresForm implements OnInit {



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

    exemplarId: string | null = null;



    constructor(
        private location: Location,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.buildForm();
        this.checkEditMode();
    }


    buildForm() {

        this.form = this.fb.group({

            nm_comum: ['', Validators.required],

            nm_cientifico: ['', Validators.required],

            endereco: ['', Validators.required],

            lat: [
                null,
                [
                    Validators.required,
                    Validators.min(-90),
                    Validators.max(90)
                ]
            ],

            lon: [
                null,
                [
                    Validators.required,
                    Validators.min(-180),
                    Validators.max(180)
                ]
            ],

            origem_esp: [''],

            floracao: [''],

            cor_flor: [''],

            idade_aproximada: [null],

            valor: [null],

            fotos: [[]]

        });

    }

    checkEditMode() {

        this.exemplarId = this.route.snapshot.paramMap.get('id');

        if (!this.exemplarId) return;

        this.isEditMode.set(true);

        this.loadExemplar(this.exemplarId);

    }

    loadExemplar(id: string) {

        this.loading.set(true);

        this.api.findExemplar(id).subscribe({

            next: exemplar => {

                console.log(exemplar.fotos);

                this.form.patchValue({

                    ...exemplar,

                    fotos: exemplar.fotos ?? []

                });



            },

            complete: () => this.loading.set(false)

        });

    }

    voltar() {
        this.location.back();
    }

    hasError(control: string, error: string) {

        const c = this.form.get(control);

        return !!(c && c.touched && c.hasError(error));

    }

    onCoordinateInput(control: 'lat' | 'lon', event: Event) {

        const input = event.target as HTMLInputElement;

        let value = input.value
            .replace(',', '.')
            .replace(/[^0-9.-]/g, '');

        this.form.get(control)?.setValue(value, {
            emitEvent: false
        });

    }

    apply() {

        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const payload = this.form.getRawValue() as Exemplar;
        payload.lat = Number(payload.lat);
        payload.lon = Number(payload.lon);
        payload.valor = Number(payload.valor);

        const dialogRef = this.dialog.open(
            ConfirmDialogComponent,
            {
                width: '360px',
                data: {
                    title: this.isEditMode()
                        ? 'Editar exemplar'
                        : 'Novo exemplar',
                    message: 'Tem certeza que deseja continuar?',
                    confirmText: 'Sim',
                    cancelText: 'Cancelar'
                }
            }
        );

        dialogRef.afterClosed().subscribe(confirmado => {

            if (!confirmado) return;

            this.loadingSave.set(true);

            if (this.isEditMode()) {

                this.api
                    .updateExemplar(
                        this.exemplarId!,
                        payload
                    )
                    .pipe(
                        finalize(() =>
                            this.loadingSave.set(false)
                        )
                    )
                    .subscribe({

                        next: () => {

                            this.showSuccess(
                                'Exemplar atualizado com sucesso!'
                            );

                        },

                        error: error => {

                            this.showError(
                                error.error.message
                            );

                        }

                    });

            } else {

                this.api
                    .addExemplar({
                        ...payload,
                        projetoId:
                            this.selectedProject()?.id ?? ''
                    })
                    .pipe(
                        finalize(() =>
                            this.loadingSave.set(false)
                        )
                    )
                    .subscribe({

                        next: () => {

                            this.showSuccess(
                                'Exemplar criado com sucesso!'
                            );

                        },

                        error: error => {

                            this.showError(
                                error.error.message
                            );

                        }

                    });

            }

        });

    }

    showSuccess(message: string) {

        this.toastr.success(
            message,
            'Sucesso!',
            { progressBar: true }
        ).onHidden.subscribe(() => {

            this.voltar();

        });

    }

    showError(message: string) {

        this.toastr.error(
            message,
            'Erro',
            { progressBar: true }
        );

    }

    // togglePhotos() {
    //     this.showPhotos.set(!this.showPhotos());
    // }

    openMap(template: TemplateRef<unknown>): void {
        this.dialog.open(template, {
            width: '95vw',
            maxWidth: '1200px',
            height: '90vh',
            maxHeight: '90vh',
            autoFocus: false,
            panelClass: 'map-dialog'
        });
    
    }

}
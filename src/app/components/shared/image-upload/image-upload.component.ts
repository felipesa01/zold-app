import {
    Component,
    forwardRef,
    inject,
    Input,
    signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

import { finalize } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiConnectionService } from '../../../services/api-connection-service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';



export interface UploadedImage {

    id?: string;

    nome: string;

    path: string;

    preview?: string;

    uploading?: boolean;

    persisted?: boolean;

}

@Component({
    selector: 'app-image-upload',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        NgbCarouselModule
    ],
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageUploadComponent),
            multi: true
        }
    ]
})
export class ImageUploadComponent implements ControlValueAccessor {

    private api = inject(ApiConnectionService);

    @Input()
    title = 'Fotografias';
    @Input()
    description = 'Adicione imagens.';

    @Input({ required: true })
    folder!: string;

    disabled = false;

    images = signal<UploadedImage[]>([]);

    selectedSlide = signal('0');
    showGallery = signal(false);

    onChange: (value: UploadedImage[]) => void = () => { };

    onTouched = () => { };

    writeValue(value: UploadedImage[] | null): void {

        // console.log('writeValue', value);
        const images = (value ?? []).map(image => ({
            ...image,
            persisted: true,
            uploading: false

        }));

        this.images.set(images);

    }

    registerOnChange(fn: (value: UploadedImage[]) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {

        this.disabled = isDisabled;

    }

    selectFiles(event: Event) {

        const input = event.target as HTMLInputElement;

        if (!input.files?.length) return;

        Array.from(input.files).forEach(file => {

            this.upload(file);

        });

        input.value = '';

        this.onTouched();

    }

    getImageUrl(image: UploadedImage): string {

        if (image.preview) {
            return image.preview;
        }

        return this.api.getImageUrl(image.path);

    }

    trackByImage(index: number, image: UploadedImage): string {

        return image.id ?? image.path ?? image.preview ?? index.toString();

    }

    private upload(file: File) {

        const local: UploadedImage = {
            nome: file.name,
            path: '',
            preview: URL.createObjectURL(file),
            uploading: true,
            persisted: false
        };

        this.images.update(images => [...images, local]);

        this.api
            .uploadImage(file, this.folder)
            .pipe(
                finalize(() => {
                    local.uploading = false;
                    this.images.update(images => [...images]);
                })
            )
            .subscribe({
                next: upload => {
                    this.images.update(images =>
                        images.map(img =>
                            img === local
                                ? {
                                    ...img,
                                    nome: upload.nome,
                                    path: upload.path,
                                    uploading: false
                                }
                                : img
                        )
                    );

                    this.emit();
                },

                error: () => {

                    this.images.update(images =>
                        images.filter(i => i !== local)
                    );

                }

            });

    }

    remove(image: UploadedImage) {

        if (image.preview) {
            URL.revokeObjectURL(image.preview);
        }

        this.images.update(images =>
            images.filter(i => i !== image)
        );

        this.emit();

    }

    private emit() {

        this.onTouched();

        this.onChange(
            this.images()
                .filter(i => !!i.path && !i.uploading)
                .map(i => ({
                    id: i.id,
                    nome: i.nome,
                    path: i.path
                }))
        );

    }


    open(image: UploadedImage) {


        const index = this.images().findIndex(i => i === image);

        this.selectedSlide.set(index.toString());
    
        this.showGallery.set(true);

    }


    closeGallery() {
        this.showGallery.set(false);
    }

}
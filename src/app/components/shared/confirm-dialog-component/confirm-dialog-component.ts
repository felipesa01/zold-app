import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

export interface ConfirmDialogData {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
}

@Component({
    selector: 'app-capturas-list',
    imports: [MatDialogModule, MatIconModule],
    templateUrl: './confirm-dialog-component.html',
    styleUrl: './confirm-dialog-component.css',
})
export class ConfirmDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
    ) { }

    confirmar() {
        this.dialogRef.close(true);
    }

    cancelar() {
        this.dialogRef.close(false);
    }
}
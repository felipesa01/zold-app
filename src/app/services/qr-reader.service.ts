import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QrReaderDialogComponent } from '../components/shared/qr-reader-dialog-component/qr-reader-dialog-component';


@Injectable({ providedIn: 'root' })
export class QrReaderService {
  private dialog = inject(MatDialog);

  abrirLeitor() {
    return this.dialog.open(QrReaderDialogComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      panelClass: 'qr-fullscreen-dialog',
      disableClose: true // não fecha clicando fora
    });
  }
}

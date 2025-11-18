import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [MatIcon],
  selector: 'app-qr-reader-dialog',
  template: `
    <div class="qr-container">
      <video #video autoplay playsinline></video>

      <div class="qr-actions">
        <button mat-fab (click)="trocarCamera()">
          <mat-icon>flip_camera_android</mat-icon>
        </button>

        <button mat-fab color="warn" (click)="fechar()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .qr-container {
      position: relative;
      background: black;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .qr-actions {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 20px;
    }

    button[mat-fab] {
      background: rgba(0,0,0,0.5);
      color: white;
    }
  `]
})
export class QrReaderDialogComponent implements OnInit, OnDestroy {

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  private reader = new BrowserQRCodeReader();
  private controls: IScannerControls | undefined;

  cameras: MediaDeviceInfo[] = [];
  cameraIndex = 0;

  constructor(
    private ref: MatDialogRef<QrReaderDialogComponent>,
    private router: Router
  ) {}

  async ngOnInit() {
    this.cameras = await BrowserQRCodeReader.listVideoInputDevices();

    if (this.cameras.length === 0) {
      alert("Nenhuma câmera encontrada");
      this.fechar();
      return;
    }

    this.iniciarLeitor();
  }

  ngOnDestroy() {
    this.pararLeitor();
  }

  async iniciarLeitor() {
    const videoEl = this.video.nativeElement;

    this.controls = await this.reader.decodeFromVideoDevice(
      this.cameras[this.cameraIndex].deviceId,
      videoEl,
      (result, err, controls) => {

        if (result) {
          const codigo = result.getText();
          console.log('QR lido:', codigo);

          this.pararLeitor();
          this.ref.close();

          this.router.navigate(['/scan', codigo], { replaceUrl: true });
        }
      }
    );
  }

  trocarCamera() {
    this.cameraIndex = (this.cameraIndex + 1) % this.cameras.length;
    this.pararLeitor();
    this.iniciarLeitor();
  }

  pararLeitor() {
    try {
      this.controls?.stop();
    } catch {}
    this.controls = undefined;
  }

  fechar() {
    this.pararLeitor();
    this.ref.close();
  }
}

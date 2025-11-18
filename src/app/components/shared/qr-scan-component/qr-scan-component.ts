import { Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { exemplarMock } from "../exemplar-info-component/data-mock";
import { ExemplarInfoComponent } from "../exemplar-info-component/exemplar-info-component";

@Component({
  standalone: true,
  template: ''
})
export class QrScanComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor(private dialog: MatDialog,) {

  }

  ngOnInit() {
    const codigo = this.route.snapshot.paramMap.get('codigo');


    if (codigo) {
      this.processarCodigo(codigo);
    }

    // Reseta a URL voltando para o root
    // replaceUrl evita poluir o histórico
    this.router.navigate(['/'], { replaceUrl: true });
  }

  processarCodigo(codigo: string) {
    console.log('Código recebido do QR:', codigo);
    this.dialog.open(ExemplarInfoComponent, {
      data: exemplarMock,
      maxWidth: '480px', // simula celular
      panelClass: 'mobile-dialog'
    });
  }
}
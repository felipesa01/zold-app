import { CommonModule, Location } from "@angular/common";
import { Component, inject, signal, effect } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatChip } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { ApiConnectionService } from "../../../../../../../../services/api-connection-service";
import { Projeto } from "../projetos.model";

@Component({
  selector: 'app-projetos-detail',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatChip, RouterModule],
  templateUrl: './projetos-detail.html',
  styleUrl: './projetos-detail.css',
})
export class ProjetosDetail {

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  projetoId = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id')))
  );

  projeto = signal<Projeto | undefined>(undefined);

  constructor(private api: ApiConnectionService, private location: Location) {
    effect((onCleanup) => {
      const id = this.projetoId();

      if (!id) {
        this.projeto.set(undefined);
        return;
      }

      const sub = this.api.findProjeto(id).subscribe({
        next: p => this.projeto.set(p),
        error: () => this.projeto.set(undefined)
      });

      onCleanup(() => sub.unsubscribe());
    });
  }

  voltar() {
    this.location.back();
  }

  statusColor(status: string) {
    return status === 'ATIVO' ? 'primary' : 'warn';
  }
}

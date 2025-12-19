import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-workspace-intro',
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="workspace-intro">

      <header class="intro-header">
        <h1>Workspace</h1>
        <p>
          Área de gestão e análise dos dados de monitoramento.
        </p>
      </header>

      <section class="quick-access">

        <div class="card" (click)="go('armadilhas')">
          <mat-icon>place</mat-icon>
          <div class="content">
            <h3>Armadilhas</h3>
            <p>
              Cadastro e manutenção dos pontos de monitoramento.
            </p>
          </div>
        </div>

        <div class="card" (click)="go('capturas')">
          <mat-icon>assignment</mat-icon>
          <div class="content">
            <h3>Capturas</h3>
            <p>
              Registros de vistorias e contagem de mosquitos.
            </p>
          </div>
        </div>

      </section>

      <section class="summary">
        <h2>Resumo</h2>

        <ul>
          <li><strong>Armadilhas cadastradas:</strong> 50</li>
          <li><strong>Capturas registradas:</strong> 5.000</li>
          <li><strong>Média de capturas por armadilha:</strong> 100</li>
        </ul>

        <p class="hint">
          Utilize o menu lateral para navegar entre os módulos do workspace.
        </p>
      </section>

    </div>
  `,
  styles: [`
    .workspace-intro {
     padding: 24px;
     max-width: 1200px;
     margin-right: auto;
     margin-left: auto;
    }

    .intro-header {
      margin-bottom: 32px;
    }

    .intro-header h1 {
      font-weight: 500;
      margin-bottom: 8px;
    }

    .intro-header p {
      color: #555;
      max-width: 600px;
    }

    .quick-access {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }

    .card {
      display: flex;
      gap: 16px;
      padding: 16px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      cursor: pointer;
      background: #fff;
      transition: background 0.15s ease, border-color 0.15s ease;
    }

    .card:hover {
      background: #f8f9fb;
      border-color: #d0d0d0;
    }

    .card mat-icon {
      font-size: 32px;
      height: 32px;
      width: 32px;
      color: #555;
    }

    .card .content h3 {
      margin: 0;
      font-weight: 500;
    }

    .card .content p {
      margin: 4px 0 0;
      font-size: 13px;
      color: #666;
    }

    .summary h2 {
      font-weight: 500;
      margin-bottom: 12px;
    }

    .summary ul {
      list-style: none;
      padding: 0;
      margin: 0 0 12px;
    }

    .summary li {
      margin-bottom: 6px;
      color: #444;
    }

    .hint {
      font-size: 13px;
      color: #777;
    }
  `]
})
export class WorkspaceIntroComponent {

  constructor(private router: Router) { }

  go(target: 'armadilhas' | 'capturas') {
    this.router.navigate([`/workspace/entities/${target}`]);
  }
}

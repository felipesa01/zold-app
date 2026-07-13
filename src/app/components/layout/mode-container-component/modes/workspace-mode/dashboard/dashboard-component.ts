import { CommonModule } from "@angular/common";
import { Component, effect, inject } from "@angular/core";
import { KpiCardsComponent } from "./components/kpi-cards/kpi-cards";
import { TimeSeriesChartComponent } from "./components/time-series-chart/time-series-chart";
import { RankingTableComponent } from "./components/ranking-table/ranking-table";
import { IntervalStatsComponent } from "./components/interval-stats/interval-stats";
import { TotalMesBarraComponent } from "./components/total-mes-barra/total-mes-barra.component";
import { TotalMonitoramentoBarraComponent } from "./components/total-monitoramento-barra/total-monitoramento-barra.component";
import { EvolucaoMesLinhaComponent } from "./components/evolucao-mes-linha/evolucao-mes-linha.component";
import { EvolucaoMonitoramentoLinhaComponent } from "./components/evolucao-monitoramento-linha/evolucao-monitoramento-linha.component";
import { TotalRegiaoBarraComponent } from "./components/total-regiao-barra.component/total-regiao-barra.component";
import { TotalArmadilhaBarraMapaComponent } from "./components/total-armadilha-barra-mapa/total-armadilha-barra-mapa.component";
import { TotalArmadilhaMapaComponent } from "./components/total-armadilha-mapa/total-armadilha-mapa.component";
import { ApiConnectionService } from "../../../../../../services/api-connection-service";
import { ProjectContextService } from "../../../../../../services/project-context.service";

@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule,
    KpiCardsComponent,
    TimeSeriesChartComponent,
    RankingTableComponent,
    IntervalStatsComponent,
    TotalMesBarraComponent,
    TotalMonitoramentoBarraComponent,
    EvolucaoMesLinhaComponent,
    EvolucaoMonitoramentoLinhaComponent,
    TotalRegiaoBarraComponent,
    TotalArmadilhaBarraMapaComponent,
    TotalArmadilhaMapaComponent],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {

  private projectContext = inject(ProjectContextService);
  selectedProject = this.projectContext.selected;

  loadingExportacao = false;

  projetoId!: string;

  constructor(private apiConnection: ApiConnectionService) {
    effect((onCleanup) => {
      const projetoId = this.selectedProject()?.id;
      if (!projetoId) return
      this.projetoId = projetoId
    });
  }

  handleExportarMosquitos(): void {

    if (!this.projetoId) {
        return;
    }

    this.loadingExportacao = true;

    this.apiConnection.exportarMosquitos(
        this.projetoId
    ).subscribe({
        next: blob => {

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');

            link.href = url;
            link.download = `mosquitos_${this.selectedProject()?.nome.toLowerCase().replaceAll(' ', '_')}.csv`;

            link.click();

            window.URL.revokeObjectURL(url);

            this.loadingExportacao = false;

        },
        error: err => {

            console.error(err);

            this.loadingExportacao = false;

        }
    });

}

}
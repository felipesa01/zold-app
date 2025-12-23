import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { KpiCardsComponent } from "./components/kpi-cards/kpi-cards";
import { TimeSeriesChartComponent } from "./components/time-series-chart/time-series-chart";
import { RankingTableComponent } from "./components/ranking-table/ranking-table";
import { IntervalStatsComponent } from "./components/interval-stats/interval-stats";

@Component({
  selector: 'app-dashboard-component',
  imports: [ CommonModule,
    KpiCardsComponent,
    TimeSeriesChartComponent,
    RankingTableComponent,
    IntervalStatsComponent],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {

}
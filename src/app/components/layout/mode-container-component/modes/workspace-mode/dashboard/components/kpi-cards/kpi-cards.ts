import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DashboardDataService } from '../../services/dashboard-data.service';

@Component({
  selector: 'app-kpi-cards',
  imports: [CommonModule],
  templateUrl: './kpi-cards.html',
  styleUrl: './kpi-cards.css',
})
export class KpiCardsComponent {

  private dataService = inject(DashboardDataService);

  kpis = toSignal(this.dataService.getKpis(), { initialValue: [] });
}
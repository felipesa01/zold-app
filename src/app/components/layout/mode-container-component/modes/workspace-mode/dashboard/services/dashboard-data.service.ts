import { inject, Injectable } from "@angular/core";
import { Observable, of, map } from "rxjs";
import { ARMADILHAS_MOCK } from "../../entities/armadilhas/armadilhas.mock";
import { CAPTURAS_MOCK } from "../../entities/capturas/captura.mock";
import { DashboardKpi, DashboardOperationalKpi, DashboardTimePoint, DashboardTrocaStats } from "../models/KPI-model";
import { DashboardMetricsService } from "./dashboard-metrics.service";
import { DashboardCriticalTrap } from "../models/ranking-model";
import { DashboardTrocaInterval } from "../models/interval-stats-model";

@Injectable({ providedIn: 'root' })
export class DashboardDataService {

    private metrics = inject(DashboardMetricsService);


    getTimeSeries(): Observable<DashboardTimePoint[]> {
        return of(
            this.metrics.buildTimeSeries(CAPTURAS_MOCK)
        );
    }

    getKpis(): Observable<DashboardKpi[]> {
        const totalArmadilhas = ARMADILHAS_MOCK.length;
        const totalCapturas = CAPTURAS_MOCK.length;
        const totalMosquitos = CAPTURAS_MOCK.reduce((s, c) => s + c.numTotal, 0);

        return of([
            { id: 'armadilhas', label: 'Armadilhas', value: totalArmadilhas },
            { id: 'capturas', label: 'Capturas', value: totalCapturas },
            { id: 'mosquitos', label: 'Mosquitos', value: totalMosquitos }
        ]);
    }

    getTrocaStats(): Observable<DashboardTrocaStats[]> {
        return of([
            this.metrics.calcularTrocaStats(
                CAPTURAS_MOCK,
                ARMADILHAS_MOCK,
                'REFIL'
            ),
            this.metrics.calcularTrocaStats(
                CAPTURAS_MOCK,
                ARMADILHAS_MOCK,
                'ATRATIVO'
            )
        ]);
    }

    getOperationalKpis(): Observable<DashboardOperationalKpi[]> {
        return this.getTrocaStats().pipe(
            map(stats =>
                stats.flatMap(s => ([
                    {
                        id: `media-${s.tipo}`,
                        label: `Média entre trocas (${s.tipo.toLowerCase()})`,
                        value: s.mediaDias,
                        unit: 'dias'
                    },
                    {
                        id: `maior-${s.tipo}`,
                        label: `Maior período sem troca (${s.tipo.toLowerCase()})`,
                        value: s.maiorPeriodoAtual,
                        unit: 'dias'
                    }
                ]))
            )
        );
    }

    getRankingCritico(): Observable<DashboardCriticalTrap[]> {
        return of(
            this.metrics.calcularRankingCritico(
                CAPTURAS_MOCK,
                ARMADILHAS_MOCK
            )
        );
    }

    getIntervalosTroca(): Observable<DashboardTrocaInterval[]> {

        const refil = this.metrics.calcularIntervalosTroca(
            CAPTURAS_MOCK,
            'REFIL'
        );

        const atrativo = this.metrics.calcularIntervalosTroca(
            CAPTURAS_MOCK,
            'ATRATIVO'
        );

        return of([refil, atrativo]);
    }
}

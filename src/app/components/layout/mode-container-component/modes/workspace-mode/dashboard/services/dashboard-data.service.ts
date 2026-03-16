import { inject, Injectable } from "@angular/core";
import { Observable, of, map } from "rxjs";
import { ARMADILHAS_MOCK } from "../../entities/armadilhas/armadilhas.mock";
import { CAPTURAS_MOCK } from "../../entities/capturas/captura.mock";
import { DashboardKpi, DashboardOperationalKpi, DashboardTimePoint, DashboardTrocaStats, MosquitosAgrupados } from "../models/KPI-model";
import { DashboardMetricsService } from "./dashboard-metrics.service";
import { DashboardCriticalTrap } from "../models/ranking-model";
import { DashboardTrocaInterval } from "../models/interval-stats-model";
import { ApiConnectionService } from "../../../../../../../services/api-connection-service";

@Injectable({ providedIn: 'root' })
export class DashboardDataService {

    private metrics = inject(DashboardMetricsService);

    constructor(private apiConnection: ApiConnectionService) { }

    getTimeSeries(projetoId: string): Observable<DashboardTimePoint[]> {
        return this.apiConnection.getTimeSeries(projetoId)
    }

    getKpis(projetoId: string): Observable<DashboardKpi[]> {
        return this.apiConnection.countArmCapMosq(projetoId).pipe(
            map(result => {
                return [
                    { id: 'armadilhas', label: 'Armadilhas', value: result.armadilhas },
                    { id: 'capturas', label: 'Capturas', value: result.capturas },
                    { id: 'mosquitos', label: 'Mosquitos', value: result.mosquitos.total }
                ]
            })
        )

    }

    // getTrocaStats(projetoId: string): Observable<DashboardTrocaStats[]> {
    //    return this.apiConnection.getTrocaStats(projetoId)
    // }

    // getOperationalKpis(projetoId: string): Observable<DashboardOperationalKpi[]> {
    //     return this.apiConnection.getTrocaStats(projetoId).pipe(
    //         map(stats =>
    //             stats.flatMap(s => ([
    //                 {
    //                     id: `media-${s.tipo}`,
    //                     label: `Média entre trocas (${s.tipo.toLowerCase()})`,
    //                     value: s.mediaDias,
    //                     unit: 'dias'
    //                 },
    //                 {
    //                     id: `maior-${s.tipo}`,
    //                     label: `Maior período sem troca (${s.tipo.toLowerCase()})`,
    //                     value: s.maiorPeriodoAtual,
    //                     unit: 'dias'
    //                 }
    //             ]))
    //         )
    //     );
    // }

    getMosquitosPorMes(projetoId: string, inicio?: Date, fim?: Date): Observable<MosquitosAgrupados[]> {
        return this.apiConnection.getMosquitosPorMes(projetoId, inicio, fim)
    }

    getRankingCritico(): Observable<DashboardCriticalTrap[]> {
        return of(
            this.metrics.calcularRankingCritico(
                CAPTURAS_MOCK,
                ARMADILHAS_MOCK
            )
        );
    }

    // getIntervalosTroca(): Observable<DashboardTrocaInterval[]> {

    //     const refil = this.metrics.calcularIntervalosTroca(
    //         CAPTURAS_MOCK,
    //         'REFIL'
    //     );

    //     const atrativo = this.metrics.calcularIntervalosTroca(
    //         CAPTURAS_MOCK,
    //         'ATRATIVO'
    //     );

    //     return of([refil, atrativo]);
    // }
}

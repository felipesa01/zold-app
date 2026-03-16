import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, map, Observable } from "rxjs";
import { Armadilha, CreateArmadilha } from "../components/layout/mode-container-component/modes/workspace-mode/entities/armadilhas/armadilha.model";
import { Captura, CreateCaptura } from "../components/layout/mode-container-component/modes/workspace-mode/entities/capturas/captura.model";
import { environment } from "../../environments/environment";
import { DashboardTimePoint, DashboardTrocaStats, EvoluçãoAgrupado, MosquitosAgrupados, MosquitosArmadilha, MosquitosRegiao } from "../components/layout/mode-container-component/modes/workspace-mode/dashboard/models/KPI-model";
import { DashboardTrocaInterval } from "../components/layout/mode-container-component/modes/workspace-mode/dashboard/models/interval-stats-model";


export interface Projeto {
    id: string
    nome: string
    status: string
    responsavel: string
    lat: number
    lon: number
    logradouro: string
    numero: string
    complemento: string
    cep: string
    cidade: string
    uf: string
}

@Injectable({ providedIn: 'root' })
export class ApiConnectionService {

    apiURL = `${environment.apiUrl}`

    constructor(private http: HttpClient) { }

    listarProjetos(): Observable<Projeto[]> {

        return this.http.get<Projeto[]>(`${this.apiURL}/projetos`)
    }

    listarArmadilhasByProjeto(projetoId: string): Observable<Armadilha[]> {
        return this.http.get<Armadilha[]>(`${this.apiURL}/projetos/${projetoId}/armadilhas`).pipe(
            // delay(20000)
        )
    }

    listarCapturasByProjeto(projetoId: string): Observable<Captura[]> {
        return this.http.get<Captura[]>(`${this.apiURL}/projetos/${projetoId}/capturas`).pipe(
            // delay(2000)
        )
    }

    listarCapturasByArmadilha(armadilhaId: string): Observable<Captura[]> {
        return this.http.get<Captura[]>(`${this.apiURL}/armadilhas/${armadilhaId}/capturas`).pipe(
            // delay(2000)
        )
    }

    findArmadilha(id: string): Observable<Armadilha> {
        return this.http.get<Armadilha>(`${this.apiURL}/armadilhas/${id}`)
    }

    findCaptura(id: string): Observable<Captura> {
        return this.http.get<Captura>(`${this.apiURL}/capturas/${id}`)
    }

    findProjeto(id: string): Observable<Projeto> {
        return this.http.get<Projeto>(`${this.apiURL}/projetos/${id}`)
    }

    addCaptura(payload: CreateCaptura): Observable<ArrayBuffer> {
        return this.http.post<ArrayBuffer>(`${this.apiURL}/capturas`, payload)
    }

    addProjeto(payload: CreateCaptura): Observable<ArrayBuffer> {
        return this.http.post<ArrayBuffer>(`${this.apiURL}/projetos`, payload)
    }

    addArmadilha(payload: CreateArmadilha): Observable<ArrayBuffer> {
        return this.http.post<ArrayBuffer>(`${this.apiURL}/armadilhas`, payload)
    }

    updateCaptura(capturaId: string, payload: object): Observable<ArrayBuffer> {
        return this.http.patch<ArrayBuffer>(`${this.apiURL}/capturas/${capturaId}`, payload).pipe(
            // delay(2000)
        )
    }

    updateArmadilha(armadilhaId: string, payload: object): Observable<ArrayBuffer> {
        return this.http.patch<ArrayBuffer>(`${this.apiURL}/armadilhas/${armadilhaId}`, payload)
    }

    updateProjeto(projetoId: string, payload: object): Observable<ArrayBuffer> {
        return this.http.patch<ArrayBuffer>(`${this.apiURL}/projetos/${projetoId}`, payload)
    }

    removeArmadilha(armadilhaId: string): Observable<ArrayBuffer> {
        return this.http.delete<ArrayBuffer>(`${this.apiURL}/armadilhas/${armadilhaId}`)
    }


    removeCaptura(capturaId: string): Observable<ArrayBuffer> {
        return this.http.delete<ArrayBuffer>(`${this.apiURL}/capturas/${capturaId}`)
    }

    removeProjeto(projetoId: string): Observable<ArrayBuffer> {
        return this.http.delete<ArrayBuffer>(`${this.apiURL}/projetos/${projetoId}`)
    }

    countArmCapMosq(projetoId: string): Observable<{
        armadilhas: number,
        capturas: number,
        mosquitos: {
            aedes: number,
            culex: number,
            outros: number,
            total: number
        }
    }> {
        return this.http.get<{
            armadilhas: number,
            capturas: number,
            mosquitos: {
                aedes: number,
                culex: number,
                outros: number,
                total: number
            }
        }>(`${this.apiURL}/projetos/${projetoId}/count`)
    }


    getTimeSeries(projetoId: string): Observable<DashboardTimePoint[]> {
        return this.http.get<DashboardTimePoint[]>(`${this.apiURL}/projetos/${projetoId}/dashboard/time-series`);
    }

    getIntervalosTroca(projetoId: string): Observable<DashboardTrocaInterval[]> {
        return this.http.get<DashboardTrocaInterval[]>(
            `${this.apiURL}/projetos/${projetoId}/dashboard/intervalos-troca`
        );
    }



    getMosquitosPorMes(projetoId: string, inicio?: Date | undefined, fim?: Date | undefined): Observable<MosquitosAgrupados[]> {
        var periodo = ''
        if (inicio) {
            periodo += `&dataInicio=${inicio.toISOString().slice(0, 10)}`
        }
        if (fim) {
            periodo += `&dataFim=${fim.toISOString().slice(0, 10)}`
        }
        return this.http.get<MosquitosAgrupados[]>(
            `${this.apiURL}/dashboard/mosquitos-mes?projetoId=${projetoId}${periodo}`
        );
    }

    getMosquitosPorMonitoramento(projetoId: string, inicio?: Date | undefined, fim?: Date | undefined): Observable<MosquitosAgrupados[]> {

        var periodo = ''
        if (inicio) {
            periodo += `&dataInicio=${inicio.toISOString().slice(0, 10)}`
        }
        if (fim) {
            periodo += `&dataFim=${fim.toISOString().slice(0, 10)}`
        }

        return this.http.get<MosquitosAgrupados[]>(
            `${this.apiURL}/dashboard/mosquitos-monitoramento?projetoId=${projetoId}${periodo}`
        );
    }

    // getEvolucaoPorMes(projetoId: string, inicio?: Date | undefined, fim?: Date | undefined): Observable<EvoluçãoAgrupado[]> {
    //     var periodo = ''
    //     if (inicio) {
    //         periodo += `&dataInicio=${inicio.toISOString().slice(0, 10)}`
    //     }
    //     if (fim) {
    //         periodo += `&dataFim=${fim.toISOString().slice(0, 10)}`
    //     }
    //     return this.http.get<EvoluçãoAgrupado[]>(
    //         `${this.apiURL}/dashboard/evolucao-mes?projetoId=${projetoId}${periodo}`
    //     );
    // }

    // getEvolucaoPorMonitoramento(projetoId: string, inicio?: Date | undefined, fim?: Date | undefined): Observable<EvoluçãoAgrupado[]> {
    //     var periodo = ''
    //     if (inicio) {
    //         periodo += `&dataInicio=${inicio.toISOString().slice(0, 10)}`
    //     }
    //     if (fim) {
    //         periodo += `&dataFim=${fim.toISOString().slice(0, 10)}`
    //     }
    //     return this.http.get<EvoluçãoAgrupado[]>(
    //         `${this.apiURL}/dashboard/evolucao-monitoramento?projetoId=${projetoId}${periodo}`
    //     );
    // }

    getMosquitosPorRegiao(projetoId: string, inicio?: Date | undefined, fim?: Date | undefined): Observable<MosquitosRegiao[]> {
        var periodo = ''
        if (inicio) {
            periodo += `&dataInicio=${inicio.toISOString().slice(0, 10)}`
        }
        if (fim) {
            periodo += `&dataFim=${fim.toISOString().slice(0, 10)}`
        }
        return this.http.get<MosquitosRegiao[]>(
            `${this.apiURL}/dashboard/regioes?projetoId=${projetoId}${periodo}`
        );
    }

    getMosquitosPorArmadilhas(projetoId: string, inicio?: Date | undefined, fim?: Date | undefined): Observable<MosquitosArmadilha[]> {
        var periodo = ''
        if (inicio) {
            periodo += `&dataInicio=${inicio.toISOString().slice(0, 10)}`
        }
        if (fim) {
            periodo += `&dataFim=${fim.toISOString().slice(0, 10)}`
        }
        return this.http.get<MosquitosArmadilha[]>(
            `${this.apiURL}/dashboard/armadilhas?projetoId=${projetoId}${periodo}`
        );
    }

}
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, map, Observable } from "rxjs";
import { Armadilha, CreateArmadilha } from "../components/layout/mode-container-component/modes/workspace-mode/entities/armadilhas/armadilha.model";
import { Captura, CreateCaptura } from "../components/layout/mode-container-component/modes/workspace-mode/entities/capturas/captura.model";

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

    apiURL = '/api';

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

    addCaptura(payload: CreateCaptura): Observable<ArrayBuffer> {
        return this.http.post<ArrayBuffer>(`${this.apiURL}/capturas`, payload)
    }

    updateCaptura(capturaId: string, payload: object): Observable<ArrayBuffer> {
        return this.http.patch<ArrayBuffer>(`${this.apiURL}/capturas/${capturaId}`, payload).pipe(
            delay(2000)
        )
    }


    addArmadilha(payload: CreateArmadilha): Observable<ArrayBuffer> {
        return this.http.post<ArrayBuffer>(`${this.apiURL}/armadilhas`, payload)
    }

    updateArmadilha(aarmadilhaId: string, payload: object): Observable<ArrayBuffer> {
        return this.http.patch<ArrayBuffer>(`${this.apiURL}/armadilhas/${aarmadilhaId}`, payload)
    }

}
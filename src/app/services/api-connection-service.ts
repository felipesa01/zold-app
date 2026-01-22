import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, map, Observable } from "rxjs";
import { Armadilha } from "../components/layout/mode-container-component/modes/workspace-mode/entities/armadilhas/armadilha.model";

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

    constructor(private http: HttpClient) {}

    listarProjetos(): Observable<Projeto[]> {

        return this.http.get<Projeto[]>(`${this.apiURL}/projetos`)
    }

    listarArmadilhas(projetoId: string): Observable<Armadilha[]> {
        const params = new HttpParams().set('projeto', projetoId);
        return this.http.get<Armadilha[]>(`${this.apiURL}/armadilhas`, { params }).pipe(
            // delay(20000)
        )
    }

    findArmadilha(id: string): Observable<Armadilha> {
        return this.http.get<Armadilha>(`${this.apiURL}/armadilhas/${id}`)
    }

}
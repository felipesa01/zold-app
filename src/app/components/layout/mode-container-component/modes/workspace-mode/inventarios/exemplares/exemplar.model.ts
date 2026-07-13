import { AnaliseInventario } from "../analises/analise.model"
import { UploadFotoDto } from "../fotos/fotos.model"

export interface Exemplar {
    id: string
    nm_comum: string
    nm_cientifico: string
    lat: number
    lon: number
    endereco: string
    origem_esp: string
    floracao: string
    cor_flor: string
    idade_aproximada: number
    valor: number
    fotos?: UploadFotoDto[];
    analises: AnaliseInventario[];
    projetoId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateExemplar {
    nm_comum: string
    nm_cientifico: string
    lat: number
    lon: number
    endereco: string
    origem_esp: string
    floracao: string
    cor_flor: string
    idade_aproximada: number
    valor: number
    projetoId: string;
}
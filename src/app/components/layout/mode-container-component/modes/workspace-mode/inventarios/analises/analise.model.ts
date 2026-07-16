import { UploadedImage } from "../../../../../../shared/image-upload/image-upload.component";
import { FotoInventario } from "../fotos/fotos.model";
import { RecomendacaoInventario } from "../recomendacoes/recomendacoes.model";

export interface AnaliseInventario {
    id: string;
    data: string;
    dap: number
    altura: number
    copa_descricao: string
    tronco_descricao: string
    sistema_radicular_descricao: string
    ataque_praga: boolean
    ataque_fungo: boolean
    ataque_bacteria: boolean
    deficiencia_nutricional: boolean
    relatorio: string
    fotos: FotoInventario[];
    recomendacoes: RecomendacaoInventario[];
    exemplarId: string
}

export interface CreateAnaliseInventario {
    data: string;
    dap: number
    altura: number
    copa_descricao: string
    tronco_descricao: string
    sistema_radicular_descricao: string
    ataque_praga: boolean
    ataque_fungo: boolean
    ataque_bacteria: boolean
    deficiencia_nutricional: boolean
    relatorio: string
    fotos: UploadedImage[];
    exemplarId: string
}
import { AnaliseInventario } from "../analises/analise.model";

export enum StatusRecomendacao {
    PENDENTE = 'PENDENTE',
    EM_EXECUCAO = 'EM_EXECUCAO',
    EXECUTADA = 'EXECUTADA',
    VALIDADA = 'VALIDADA',
    CANCELADA = 'CANCELADA'
}


export interface RecomendacaoInventario {
    id: string;
    titulo: string;
    descricao: string;
    status: StatusRecomendacao;
    analise: AnaliseInventario;
    analiseId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    tenantId?: string;
}

export interface CreateRecomendacaoInventario {
    titulo: string;
    descricao?: string;
    status?: StatusRecomendacao;
  }
  
  export interface UpdateRecomendacaoInventario {
    titulo?: string;
    descricao?: string;
    status?: StatusRecomendacao;
  }
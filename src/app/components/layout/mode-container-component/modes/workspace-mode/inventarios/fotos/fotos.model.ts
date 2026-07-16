export interface FotoInventario {
    nome: string;
    path: string;
    userId: string;
    analiseId?: string;
    exemplarId?: string;
}

export interface UploadFotoDto {
    nome: string;
    path: string;
}
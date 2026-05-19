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
    recomendacoes: string
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
    recomendacoes: string
    exemplarId: string
}
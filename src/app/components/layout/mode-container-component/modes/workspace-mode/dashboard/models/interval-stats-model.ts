export type TipoTroca = 'REFIL' | 'ATRATIVO';

export interface DashboardTrocaIntervalExtremo {
    armadilhaId: string;
    dias: number;
}

export interface DashboardTrocaInterval {
    tipo: TipoTroca;
    media: number;
    min: DashboardTrocaIntervalExtremo | null;
    max: DashboardTrocaIntervalExtremo | null;
}
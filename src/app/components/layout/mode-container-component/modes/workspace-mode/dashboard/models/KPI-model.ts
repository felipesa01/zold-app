export interface DashboardKpi {
  id: string;
  label: string;
  value: number | string;
  unit?: string;
}

export interface DashboardKpis {
  totalArmadilhas: number;
  armadilhasAtivas: number;

  totalCapturas: number;
  totalMosquitos: number;

  ultimaAtualizacao: string; // ISO date
}

export interface DashboardRankingItem {
  armadilhaId: string;
  codigo?: string;

  diasSemTrocaRefil?: number;
  diasSemTrocaAtrativo?: number;

  qtdExtravios: number;
  qtdDerrubadas: number;
}

export interface DashboardTimePoint {
  timestamp: number;
  numAedes: number;
  numCulex: number;
  numOutras: number;
  numTotal: number;
}

export interface DashboardOperationalKpi {
  id: string;
  label: string;
  value: number;
  unit?: string;
}

export interface DashboardTrocaStats {
  tipo: 'REFIL' | 'ATRATIVO';

  mediaDias: number;
  menorIntervalo: number;
  maiorIntervalo: number;

  armadilhasSemTroca: number;
  maiorPeriodoAtual: number;
}


// Modulo de Dashboard
export interface MosquitosAgrupados {
  timestamp: Date,
  aedes: number,
  culex: number,
  outras: number
}

export interface EvoluçãoAgrupado {
  timestamp: Date;
  aedes: number;
  culex: number;
  outras: number;
}

export interface MosquitosRegiao {
  regiao: string;
  aedes: number;
  culex: number;
  outras: number;
}

export interface MosquitosArmadilha {
  a_id: string,
  armadilha: string;
  a_regiao: string,
  a_lat: number;
  a_lon: number;
  aedes: number;
  culex: number;
  outras: number;
}




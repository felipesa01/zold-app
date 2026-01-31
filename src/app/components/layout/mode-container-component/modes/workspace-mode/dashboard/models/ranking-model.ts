export interface DashboardCriticalTrap {
  armadilhaId: string;
  nome?: string;
  regiao?: string;

  diasSemRefil: number | null;
  diasSemAtrativo: number | null;

  qtdExtravios: number;
  qtdDerrubadas: number;

  scoreCriticidade: number;
}
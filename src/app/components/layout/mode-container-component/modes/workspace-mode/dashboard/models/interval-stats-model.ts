export interface DashboardTrocaInterval {
  tipo: 'REFIL' | 'ATRATIVO';
  intervalos: number[];
  media: number;
  min: number;
  max: number;
}
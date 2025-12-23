export interface AplicacaoInseticida {
  id: string;
  data: string;           // ISO
  area: 'REGIAO' | 'ARMADILHA';
  armadilhaId?: string;   // se for localizada
  fatorReducao: number;   // ex: 0.85 = -15%
}

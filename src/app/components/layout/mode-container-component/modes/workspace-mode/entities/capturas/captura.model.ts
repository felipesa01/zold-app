export type CapturaStatus = 'ATIVA' | 'INATIVA';
export type SituacaoFisica = 'REGULAR' | 'DERRUBADA' | 'EXTRAVIADA';

export interface Captura {
  id: string;
  data: string;
  status: CapturaStatus;

  numAedes: number;
  numCulex: number;
  numOutras: number;
  numTotal: number;

  trocaRefil: boolean;
  trocaAtrativo: boolean;

  situacaoFisica: SituacaoFisica;

  userId: string;
  armadilhaId: string;
}

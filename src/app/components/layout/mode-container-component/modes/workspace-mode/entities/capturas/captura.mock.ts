import { Captura } from './captura.model';
import { ARMADILHAS_MOCK } from '../armadilhas/armadilhas.mock';
import { uuid } from '../../../../../../../utils/uuid.util';
import { AplicacaoInseticida } from '../aplicacoes/aplicacoes.model';
import { APLICACOES_MOCK } from '../aplicacoes/aplicacoes.mock';

function nextValue(
  prev: number,
  maxDelta: number,
  min = 0
): number {
  const delta = Math.floor((Math.random() * 2 - 1) * maxDelta);
  return Math.max(min, prev + delta);
}

export const CAPTURAS_MOCK: Captura[] = ARMADILHAS_MOCK.flatMap((armadilha, armIndex) => {

  let aedes = 5;
  let culex = 8;
  let outras = 2;

  let lastRefil = false;
  let lastAtrativo = false;


  return Array.from({ length: 100 }).map((_, i) => {

    let trocaRefil = Math.random() < 0.05 && !lastRefil;
    let trocaAtrativo = Math.random() < 0.03 && !lastAtrativo;

    const globalIndex = armIndex * 100 + i;

    const situacaoFisica =
      i % 25 === 0
        ? 'EXTRAVIADA'
        : i % 12 === 0
          ? 'DERRUBADA'
          : 'REGULAR';

    const data = `2025-${((i % 12) + 1).toString().padStart(2, '0')}-${((i % 28) + 1)
      .toString()
      .padStart(2, '0')}`;

    const ts = new Date(data).getTime();
    const fator = fatorInseticida(ts, APLICACOES_MOCK);

    const status =
      situacaoFisica === 'EXTRAVIADA' ? 'INATIVA' : 'ATIVA';

    const numAedes =
      situacaoFisica === 'REGULAR'
        ? Math.round(nextValue(aedes, 2) * fator)
        : 0;

    const numCulex =
      situacaoFisica === 'REGULAR'
        ? Math.round(nextValue(culex, 3) * fator)
        : 0;

    const numOutras =
      situacaoFisica === 'REGULAR'
        ? Math.round(nextValue(outras, 1) * fator)
        : 0;

    const numTotal = numAedes + numCulex + numOutras;

    if (situacaoFisica === 'REGULAR') {
      aedes = numAedes;
      culex = numCulex;
      outras = numOutras;
    }

    return {
      id: uuid(),
      data: data,
      status,
      numAedes,
      numCulex,
      numOutras,
      numTotal,

      trocaRefil: trocaRefil,
      trocaAtrativo: trocaAtrativo,

      situacaoFisica,

      userId: 'user-001',
      armadilhaId: armadilha.id
    };
  });


  function fatorInseticida(
    dataCaptura: number,
    aplicacoes: AplicacaoInseticida[]
  ): number {

    const DURACAO = 15 * 24 * 60 * 60 * 1000; // 15 dias
    let fator = 1;

    aplicacoes.forEach(a => {
      const ts = new Date(a.data).getTime();
      const diff = dataCaptura - ts;

      if (diff > 0 && diff < DURACAO) {
        const progress = 1 - diff / DURACAO;
        fator *= 1 - (1 - a.fatorReducao) * progress;
      }
    });

    return fator;
  }

});

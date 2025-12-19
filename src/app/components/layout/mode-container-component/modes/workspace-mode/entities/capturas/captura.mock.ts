import { Captura } from './captura.model';
import { ARMADILHAS_MOCK } from '../armadilhas/armadilhas.mock';
import { uuid } from '../../../../../../../utils/uuid.util';

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

    const status =
      situacaoFisica === 'EXTRAVIADA' ? 'INATIVA' : 'ATIVA';

    const numAedes =
      situacaoFisica === 'REGULAR' ? nextValue(aedes, 2) : 0;

    const numCulex =
      situacaoFisica === 'REGULAR' ? nextValue(culex, 3) : 0;

    const numOutras =
      situacaoFisica === 'REGULAR' ? nextValue(outras, 1) : 0;

    const numTotal = numAedes + numCulex + numOutras;

    return {
      id: uuid(),
      data: `2025-${((i % 12) + 1).toString().padStart(2, '0')}-${((i % 28) + 1)
        .toString()
        .padStart(2, '0')}`,

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

});

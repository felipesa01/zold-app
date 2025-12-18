import { Captura } from './captura.model';
import { ARMADILHAS_MOCK } from '../armadilhas/armadilhas.mock';
import { uuid } from '../../../../../../../utils/uuid.util';

export const CAPTURAS_MOCK: Captura[] = ARMADILHAS_MOCK.flatMap((armadilha, armIndex) => {

  return Array.from({ length: 100 }).map((_, i) => {

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
      situacaoFisica === 'REGULAR' ? (i % 6) + 1 : 0;

    const numCulex =
      situacaoFisica === 'REGULAR' ? (i % 4) : 0;

    const numOutras =
      situacaoFisica === 'REGULAR' ? (i % 3) : 0;

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

      trocaRefil: i % 3 === 0,
      trocaAtrativo: i % 4 === 0,

      situacaoFisica,

      userId: 'user-001',
      armadilhaId: armadilha.id
    };
  });

});

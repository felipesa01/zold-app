import { uuid } from '../../../../../../../utils/uuid.util';
import { Armadilha } from './armadilha.model';

export const ARMADILHAS_MOCK: Armadilha[] = Array.from({ length: 50 }).map((_, i) => {
  const idx = (i + 1).toString().padStart(2, '0');

  return {
    id: uuid(),
    nome: `ARM-${idx}`,
    lat: -23.55 + i * 0.001,
    lon: -46.63 + i * 0.001,
    referencia: `Referência ${idx}`,
    regiao: i % 4 === 0
      ? 'Centro'
      : i % 4 === 1
      ? 'Zona Norte'
      : i % 4 === 2
      ? 'Zona Sul'
      : 'Zona Leste',
    createdAt: '2025-01-01T10:00:00.000Z',
    updatedAt: '2025-01-10T10:00:00.000Z'
  };
});

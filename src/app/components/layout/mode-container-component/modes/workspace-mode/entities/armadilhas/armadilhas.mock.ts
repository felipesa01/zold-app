import { uuid } from '../../../../../../../utils/uuid.util';
import { Armadilha } from './armadilha.model';

function randomGaussian(mean = 0, stdDev = 1): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mean + stdDev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function randomLatLonSaoPaulo(): { lat: number; lon: number } {
  // centro aproximado da cidade de SP
  const centerLat = -23.5505;
  const centerLon = -46.6333;

  // raio urbano médio ~15 km
  const radiusKm = 15;
  const radiusDeg = radiusKm / 111;

  let lat: number;
  let lon: number;

  do {
    lat = centerLat + randomGaussian(0, radiusDeg / 2);
    lon = centerLon + randomGaussian(0, radiusDeg / 2);
  } while (
    lat < -23.74 || lat > -23.35 ||
    lon < -46.83 || lon > -46.36
  );

  return { lat, lon };
}

export const ARMADILHAS_MOCK: Armadilha[] = Array.from({ length: 50 }).map((_, i) => {
  const idx = (i + 1).toString().padStart(2, '0');

  const { lat, lon } = randomLatLonSaoPaulo();

  return {
    id: uuid(),
    nome: `ARM-${idx}`,
    lat,
    lon,
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

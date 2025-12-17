import { Captura } from './captura.model';

export const CAPTURAS_MOCK: Captura[] = [

  // 🔹 ARM-001 — situação normal
  {
    id: '1db8b471-3ce9-4e00-bd3e-3868440f2b12',
    data: '2025-01-10',
    status: 'ATIVA',

    numAedes: 4,
    numCulex: 2,
    numOutras: 1,
    numTotal: 7,

    trocaRefil: true,
    trocaAtrativo: false,

    situacaoFisica: 'REGULAR',

    userId: '1d6429ae-130c-4500-b602-9b70bbad17c6',
    armadilhaId: '0cff5ff2-019d-4500-a2bc-fa1b41aff0a8'
  },

  // 🔹 ARM-001 — armadilha derrubada, mas ainda ativa
  {
    id: 'b7c3c5a4-8d7a-4f1c-9c3f-4ad2d88a8a11',
    data: '2025-01-17',
    status: 'ATIVA',

    numAedes: 1,
    numCulex: 0,
    numOutras: 0,
    numTotal: 1,

    trocaRefil: false,
    trocaAtrativo: false,

    situacaoFisica: 'DERRUBADA',

    userId: '1d6429ae-130c-4500-b602-9b70bbad17c6',
    armadilhaId: '0cff5ff2-019d-4500-a2bc-fa1b41aff0a8'
  },

  // 🔹 ARM-002 — situação regular
  {
    id: 'a2f7f9d1-34c1-4d8e-8d21-42b9dff2c9c4',
    data: '2025-01-11',
    status: 'ATIVA',

    numAedes: 0,
    numCulex: 3,
    numOutras: 0,
    numTotal: 3,

    trocaRefil: true,
    trocaAtrativo: true,

    situacaoFisica: 'REGULAR',

    userId: '1d6429ae-130c-4500-b602-9b70bbad17c6',
    armadilhaId: 'b3f71d91-3d87-4c25-8a3c-9fdac4c9e123'
  },

  // 🔹 ARM-002 — armadilha EXTRAVIADA (obrigatoriamente INATIVA)
  {
    id: 'f3b4e1a7-1c1d-42a2-9c8f-4c11e9b8c771',
    data: '2025-01-18',
    status: 'INATIVA', // ⚠ regra respeitada

    numAedes: 0,
    numCulex: 0,
    numOutras: 0,
    numTotal: 0,

    trocaRefil: false,
    trocaAtrativo: false,

    situacaoFisica: 'EXTRAVIADA',

    userId: '1d6429ae-130c-4500-b602-9b70bbad17c6',
    armadilhaId: 'b3f71d91-3d87-4c25-8a3c-9fdac4c9e123'
  }
];

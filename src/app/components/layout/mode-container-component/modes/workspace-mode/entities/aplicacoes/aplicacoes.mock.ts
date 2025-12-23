import { uuid } from "../../../../../../../utils/uuid.util";
import { AplicacaoInseticida } from "./aplicacoes.model";


export const APLICACOES_MOCK: AplicacaoInseticida[] = [
  {
    id: uuid(),
    data: '2025-02-10',
    area: 'REGIAO',
    fatorReducao: 0.85
  },
  {
    id: uuid(),
    data: '2025-05-05',
    area: 'REGIAO',
    fatorReducao: 0.8
  },
  {
    id: uuid(),
    data: '2025-09-20',
    area: 'REGIAO',
    fatorReducao: 0.9
  }
];

import { CapturaCarrapato } from "../capturas/captura-carrapato.model";


export interface ArmadilhaCarrapato {
  id?: string;

  nome: string;

  lat: number;

  lon: number;

  referencia: string;

  regiao: string;

  projetoId: string;

  createdAt?: string;

  updatedAt?: string;

  capturas?: CapturaCarrapato[];
}
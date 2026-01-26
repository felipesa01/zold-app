export interface Armadilha {
  id: string;
  nome: string;
  lat: number;
  lon: number;
  referencia: string;
  regiao: string;
  projetoId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateArmadilha {
  nome: string;
  lat: number;
  lon: number;
  referencia: string;
  regiao: string;
  projetoId: string;
}
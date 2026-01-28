
export type AppMode = 'map' | 'workspace';

export type FixedFeature =
  // mapa
  | 'layers'
  | 'modules'
  | 'lists'

  // workspace
  | 'entities'
  | 'reports'
  | 'dashboard';


export interface MenuItemConfig {
  id: FixedFeature;
  nome: string;
  icon: string;
  expandible: boolean;
  route?: string[];
  component?: any;
  permission?: string;
  planRequired?: string[];
}

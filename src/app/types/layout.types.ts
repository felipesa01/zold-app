
export type AppMode = 'map' | 'workspace';

export type SideMenuItemId =
  // mapa
  | 'layers'
  | 'modules'
  | 'lists'

  // workspace
  | 'entities'
  | 'reports'
  | 'dashboard';


export interface SideMenuItemConfig {
  id: SideMenuItemId;
  nome: string;
  icon: string;
  expandible: boolean;
  route?: string[];
  component?: any;
  permission?: string;
  planRequired?: string[];
}


export type AppMode = 'map' | 'workspace';

export type SideMenuItemId =
  | 'account'
  // mapa
  | 'layers'
  | 'modules'
  | 'lists'

  // workspace
  | 'services'
  | 'reports'
  | 'dashboard'
  | 'projects';


export interface SideMenuItemConfig {
  id: SideMenuItemId;
  nome: string;
  icon: string;
  expandible: boolean;
  route?: string[];
  component?: any;
  permission?: string;
  planRequired?: string[];
  disabled?: boolean 
}

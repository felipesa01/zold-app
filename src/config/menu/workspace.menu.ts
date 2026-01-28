import { ListasMenuComponent } from "../../app/components/layout/mode-container-component/sidebar-expandable-component/listas-menu-component/listas-menu-component";
import { MenuItemConfig } from "../../app/types/layout.types";


export const WORKSPACE_MENU: MenuItemConfig[] = [
  {
    id: 'entities',
    nome: 'Entidades',
    icon: 'ballot',
    expandible: true,
    component: ListasMenuComponent
  },
  {
    id: 'reports',
    nome: 'Relatórios',
    icon: 'assessment',
    expandible: false,
  },
  {
    id: 'dashboard',
    nome: 'Dashboard',
    icon: 'space_dashboard',
    expandible: false,
    route: ['/workspace/dashboard']
  }
];

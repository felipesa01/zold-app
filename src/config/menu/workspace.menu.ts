import { ServicosDetListaComponent } from "../../app/components/layout/mode-container-component/sidebar-expandable-component/servicos-det-lista-component/servicos-det-lista-component";
import { SideMenuItemConfig } from "../../app/types/layout.types";


export const WORKSPACE_MENU: SideMenuItemConfig[] = [
  {
    id: 'projects',
    nome: 'Projetos',
    icon: 'home_work',
    expandible: false,
    route: ['/workspace/projetos']
  },
  {
    id: 'services',
    nome: 'Serviços',
    icon: 'list',
    expandible: true,
    component: ServicosDetListaComponent
  },
  {
    id: 'reports',
    nome: 'Relatórios',
    icon: 'assessment',
    expandible: false,
    disabled: true
  },
  {
    id: 'dashboard',
    nome: 'Dashboard',
    icon: 'space_dashboard',
    expandible: true,
    component: ServicosDetListaComponent,
    disabled: false
  }
];

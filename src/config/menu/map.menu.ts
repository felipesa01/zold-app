import { SideMenuItemConfig } from "../../app/types/layout.types";



export const MAP_MENU: SideMenuItemConfig[] = [
  {
    id: 'layers',
    nome: 'Camadas',
    icon: 'layers',
    expandible: true,
    disabled: true
  },
  {
    id: 'modules',
    nome: 'Módulos',
    icon: 'view_module',
    expandible: true,
    disabled: true
  },
  {
    id: 'lists',
    nome: 'Listas',
    icon: 'list',
    expandible: true,
    disabled: true
  }
];
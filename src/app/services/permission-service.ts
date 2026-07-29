import { Injectable } from "@angular/core";
import { AuthService } from "../../auth/services/auth.service";
import { App } from "../app";

export const AppPermissions = {
    // Exemplares
    EXEMPLAR_CREATE: 'exemplar.create',
    EXEMPLAR_UPDATE: 'exemplar.update',
    EXEMPLAR_DELETE: 'exemplar.delete',

    // Análises
    ANALISE_CREATE: 'analise.create',
    ANALISE_UPDATE: 'analise.update',
    ANALISE_DELETE: 'analise.delete',

    // Recomendações
    RECOMENDACAO_CREATE: 'recomendacao.create',
    RECOMENDACAO_UPDATE: 'recomendacao.update',
    RECOMENDACAO_DELETE: 'recomendacao.delete',

    // Armadilhas de Mosquitos
    ARMADILHA_MOSQUITO_CREATE: 'armadilha-mosquito.create',
    ARMADILHA_MOSQUITO_UPDATE: 'armadilha-mosquito.update',
    ARMADILHA_MOSQUITO_DELETE: 'armadilha-mosquito.delete',

    // Capturas de Mosquitos
    CAPTURA_MOSQUITO_CREATE: 'captura-mosquito.create',
    CAPTURA_MOSQUITO_UPDATE: 'captura-mosquito.update',
    CAPTURA_MOSQUITO_DELETE: 'captura-mosquito.delete',

    // Armadilhas de Carrapatos
    ARMADILHA_CARRAPATO_CREATE: 'armadilha-carrapato.create',
    ARMADILHA_CARRAPATO_UPDATE: 'armadilha-carrapato.update',
    ARMADILHA_CARRAPATO_DELETE: 'armadilha-carrapato.delete',

    // Capturas de Carrapatos
    CAPTURA_CARRAPATO_CREATE: 'captura-carrapato.create',
    CAPTURA_CARRAPATO_UPDATE: 'captura-carrapato.update',
    CAPTURA_CARRAPATO_DELETE: 'captura-carrapato.delete',

    // Administração
    USUARIOS_MANAGE: 'usuarios.manage',

    PROJETOS_MANAGE: 'projetos.manage',

    // Dashboards
    DASHBOARDS_VIEW: 'dashboards.view',
    DASHBOARDS_EXPORT: 'dashboards.export',
} as const;

export type AppPermission =
    typeof AppPermissions[keyof typeof AppPermissions];

export type Permission =
    typeof AppPermissions[keyof typeof AppPermissions];

    
@Injectable({
    providedIn: 'root'
})
export class PermissionService {

    constructor(
        private authService: AuthService
    ) {}

    
    private readonly permissions: Record<string, string[]> = {
        DIRETOR: [
   
            AppPermissions.EXEMPLAR_CREATE,
            AppPermissions.EXEMPLAR_UPDATE,
            AppPermissions.EXEMPLAR_DELETE,

            AppPermissions.ANALISE_CREATE,
            AppPermissions.ANALISE_UPDATE,
            AppPermissions.ANALISE_UPDATE,

            AppPermissions.RECOMENDACAO_CREATE,
            AppPermissions.RECOMENDACAO_UPDATE,
            AppPermissions.RECOMENDACAO_DELETE,

            AppPermissions.ARMADILHA_CARRAPATO_CREATE,
            AppPermissions.ARMADILHA_CARRAPATO_UPDATE,
            AppPermissions.ARMADILHA_CARRAPATO_DELETE,

            AppPermissions.CAPTURA_CARRAPATO_CREATE,
            AppPermissions.CAPTURA_CARRAPATO_UPDATE,
            AppPermissions.CAPTURA_CARRAPATO_DELETE,
        
            AppPermissions.ARMADILHA_MOSQUITO_CREATE,
            AppPermissions.ARMADILHA_MOSQUITO_UPDATE,
            AppPermissions.ARMADILHA_MOSQUITO_DELETE,

            AppPermissions.CAPTURA_MOSQUITO_CREATE,
            AppPermissions.CAPTURA_MOSQUITO_UPDATE,
            AppPermissions.CAPTURA_MOSQUITO_DELETE,

            
            AppPermissions.USUARIOS_MANAGE,
            AppPermissions.PROJETOS_MANAGE,

            AppPermissions.DASHBOARDS_VIEW,
            AppPermissions.DASHBOARDS_EXPORT
        ],
    
        COORDENADOR: [   
            AppPermissions.ANALISE_CREATE,
            AppPermissions.ANALISE_UPDATE,
    
            AppPermissions.RECOMENDACAO_CREATE,
            AppPermissions.RECOMENDACAO_UPDATE,

            AppPermissions.USUARIOS_MANAGE,
            AppPermissions.PROJETOS_MANAGE,

            AppPermissions.DASHBOARDS_VIEW,
            AppPermissions.DASHBOARDS_EXPORT,
            
        ],
    
        TECNICO: [
            AppPermissions.EXEMPLAR_CREATE,
            AppPermissions.EXEMPLAR_UPDATE,
            AppPermissions.EXEMPLAR_DELETE,

            AppPermissions.ANALISE_CREATE,
            AppPermissions.ANALISE_UPDATE,
            AppPermissions.ANALISE_UPDATE,

            AppPermissions.RECOMENDACAO_CREATE,
            AppPermissions.RECOMENDACAO_UPDATE,
            AppPermissions.RECOMENDACAO_DELETE,

            AppPermissions.ARMADILHA_CARRAPATO_CREATE,
            AppPermissions.ARMADILHA_CARRAPATO_UPDATE,
            AppPermissions.ARMADILHA_CARRAPATO_DELETE,

            AppPermissions.CAPTURA_CARRAPATO_CREATE,
            AppPermissions.CAPTURA_CARRAPATO_UPDATE,
            AppPermissions.CAPTURA_CARRAPATO_DELETE,
        
            AppPermissions.ARMADILHA_MOSQUITO_CREATE,
            AppPermissions.ARMADILHA_MOSQUITO_UPDATE,
            AppPermissions.ARMADILHA_MOSQUITO_DELETE,

            AppPermissions.CAPTURA_MOSQUITO_CREATE,
            AppPermissions.CAPTURA_MOSQUITO_UPDATE,
            AppPermissions.CAPTURA_MOSQUITO_DELETE,

            AppPermissions.DASHBOARDS_VIEW
        ],
    
        CLIENTE_ADMIN: [    
            AppPermissions.DASHBOARDS_VIEW
        ],
    
        CLIENTE_EXECUTOR: [  
            AppPermissions.RECOMENDACAO_UPDATE
        ]
    };


    has(permission: Permission): boolean { 
        const perfil = this.authService.currentUser?.role;

        if (!perfil) {
            return false;
        }

        return this.permissions[perfil]?.includes(permission) ?? false;
    }

    hasAny(...permissions: Permission[]): boolean {
        return permissions.some(permission => this.has(permission));
    }


    hasAll(...permissions: Permission[]): boolean {
        return permissions.every(permission => this.has(permission));
    }
}
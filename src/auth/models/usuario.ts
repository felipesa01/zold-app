export interface AuthUser {
    id: string;
    nome: string;
    email: string;
    role: UserRole;
    ativo: boolean;
    projectIds: string[];
}

export enum UserRole {
    DIRETOR = 'DIRETOR',
    COORDENADOR = 'COORDENADOR',
    TECNICO = 'TECNICO',
    CLIENTE_ADMIN = 'CLIENTE_ADMIN',
    CLIENTE_EXECUTOR = 'CLIENTE_EXECUTOR'
}
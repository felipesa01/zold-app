import { UserRole } from "../models/usuario";


export interface AuthUser {
    id: string;
    nome: string;
    email: string;
    role: UserRole;
    ativo: boolean;
    projectIds: string[];
}
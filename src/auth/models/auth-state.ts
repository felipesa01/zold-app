import { AuthUser } from './auth-user';

export interface AuthState {
    token: string | null;
    user: AuthUser | null;
    authenticated: boolean;
}
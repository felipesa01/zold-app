import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private readonly TOKEN_KEY = 'access_token';

    public getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    public setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    public removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    public hasToken(): boolean {
        return !!this.getToken();
    }
}
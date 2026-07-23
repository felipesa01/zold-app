import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';



import {
    AuthUser,
    LoginRequest,
    LoginResponse
} from '../models';

import { TokenService } from './token.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly api = `${environment.apiUrl}/auth`;

    private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    public get currentUser(): AuthUser | null {
        return this.currentUserSubject.value;
    }

    constructor(
        private readonly http: HttpClient,
        private readonly tokenService: TokenService
    ) { }

    public login(request: LoginRequest): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(`${this.api}/login`, request)
            .pipe(
                tap(response => {
                    this.tokenService.setToken(response.access_token);
                })
            );
    }

    public loadUser(): Observable<AuthUser> {
        return this.http
            .get<AuthUser>(`${this.api}/me`)
            .pipe(
                tap(user => {
                    this.currentUserSubject.next(user);
                })
            );
    }

    public logout(): void {
        this.tokenService.removeToken();
        this.currentUserSubject.next(null);
    }

    public getCurrentUser(): AuthUser | null {
        return this.currentUserSubject.value;
    }

    public isAuthenticated(): boolean {
        return this.tokenService.hasToken();
    }

    public restoreSession(): Observable<AuthUser | null> {

        if (!this.tokenService.hasToken()) {
            return of(null);
        }

        return this.loadUser().pipe(
            catchError(() => {
                this.logout();
                return of(null);
            })
        );
    }

    changePassword(data: {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    }) {
        return this.http.patch(
            `${this.api}/change-password`,
            data
        );
    }
}
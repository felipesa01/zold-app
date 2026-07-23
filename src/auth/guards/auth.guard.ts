import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {

    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isAuthenticated()) {
        return router.createUrlTree(['/login']);
    }

    if (auth.getCurrentUser()) {
        return true;
    }

    return auth.loadUser().pipe(
        map(() => true),
        catchError(() => {
            auth.logout();
            return of(router.createUrlTree(['/login']));
        })
    );
};
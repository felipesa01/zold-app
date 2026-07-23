import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermissionService, Permission } from '../services/permission-service';


export const permissionGuard: CanActivateFn = (route) => {

    const permissionService = inject(PermissionService);
    const router = inject(Router);

    const permissions = route.data['permissions'] as Permission[] | undefined;
    const requireAll = route.data['requireAll'] ?? false;

    if (!permissions || permissions.length === 0) {
        return true;
    }

    const allowed = requireAll
        ? permissionService.hasAll(...permissions)
        : permissionService.hasAny(...permissions);

    if (allowed) {
        return true;
    }

    return router.createUrlTree(['/403']);
};
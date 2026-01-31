import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy
} from '@angular/router';

import { effect, inject } from '@angular/core';
import { ReuseCacheService } from './reuse-cache.service';

export class WorkspaceReuseStrategy implements RouteReuseStrategy {

  private cache = new Map<string, DetachedRouteHandle>();
  private reuseCache = inject(ReuseCacheService);

  constructor() {
    effect(() => {
      this.reuseCache.clearSignal();
      this.cache.clear(); // limpa cache quando solicitado
    });
  }

  private getKey(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map(r => r.routeConfig?.path)
      .filter(Boolean)
      .join('/');
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data?.['reuse'] === true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const key = this.getKey(route);
    this.cache.set(key, handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const key = this.getKey(route);
    return this.cache.has(key);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const key = this.getKey(route);
    return this.cache.get(key) || null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}

import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ReuseCacheService {

  private _clearSignal = signal(0);

  clearSignal = this._clearSignal.asReadonly();

  clearCache() {
    this._clearSignal.update(v => v + 1);
  }
}
import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ListReloadService {

  private _reload = signal(0);

  readonly reload = this._reload.asReadonly();

  trigger(): void {
    this._reload.update(v => v + 1);
  }
}
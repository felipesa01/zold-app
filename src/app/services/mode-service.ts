import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModeService {
  readonly mode = signal<'map' | 'workspace'>('map')
}

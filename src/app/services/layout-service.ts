import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  fixedSidebarOpened = signal(false);
  
  expandableSidebarOpened = signal(false);
}

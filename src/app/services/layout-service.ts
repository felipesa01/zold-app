import { Injectable, signal } from '@angular/core';
import { FixedFeature } from '../types/layout.types';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  fixedSidebarOpened = signal(false);

  expandableSidebarOpened = signal(false);


  activeFeature = signal<FixedFeature | null>(null);

  openFeature(feature: FixedFeature) {
    if (this.activeFeature() === feature) {
      this.activeFeature.set(null);
      this.expandableSidebarOpened.set(false);
    } else {
      this.activeFeature.set(feature);
      this.expandableSidebarOpened.set(true);
    }
  }

  closeExpandable() {
    this.activeFeature.set(null);
    this.expandableSidebarOpened.set(false);
  }
  
}

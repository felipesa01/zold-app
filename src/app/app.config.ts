import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { registerMaterialSymbols } from './material-symbols.config';
import { provideHttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Overlay, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    registerMaterialSymbols(),
    provideHttpClient(),
  ]
};

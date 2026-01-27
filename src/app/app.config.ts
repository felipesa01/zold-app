import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';

import { routes } from './app.routes';
import { registerMaterialSymbols } from './material-symbols.config';
import { provideHttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Overlay, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideNativeDateAdapter } from '@angular/material/core';
import { WorkspaceReuseStrategy } from './components/layout/mode-container-component/modes/workspace-mode/workspace-reuse.strategy';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    registerMaterialSymbols(),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    provideNativeDateAdapter(),
    { provide: RouteReuseStrategy, useClass: WorkspaceReuseStrategy },
    provideToastr(),
    provideAnimations()
  ]
};

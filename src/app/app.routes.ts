import { Routes } from '@angular/router';
import { QrScanComponent } from './components/shared/qr-scan-component/qr-scan-component';
import { WorkspaceComponent } from './components/layout/mode-container-component/modes/workspace-mode/workspace-component/workspace-component';
import { MapComponent } from './components/layout/mode-container-component/modes/map-mode/map-component/map-component';
import { AppShellComponent } from './components/layout/app-shell-component/app-shell-component';

export const routes: Routes = [
    {
        path: 'scan/:codigo',
        component: QrScanComponent
    },

    {
        path: 'map',
        loadComponent: () =>
            import('./components/layout/mode-container-component/modes/map-mode/map-component/map-component')
                .then(m => m.MapComponent)
    },
    {
        path: 'workspace',
        loadComponent: () =>
            import('./components/layout/mode-container-component/modes/workspace-mode/workspace-component/workspace-component')
                .then(m => m.WorkspaceComponent),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/workspace-component/workspace-intro-component/workspace-intro.component')
                        .then(m => m.WorkspaceIntroComponent)
            },
            {
                path: 'entities/capturas',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/entities/capturas/capturas-list/capturas-list')
                        .then(m => m.CapturasList)
            },
            {
                path: 'entities/capturas/:id',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/entities/capturas/capturas-detail/capturas-detail')
                        .then(m => m.CapturasDetail)
            },
            {
                path: 'entities/capturas/new',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/entities/capturas/capturas-form/capturas-form')
                        .then(m => m.CapturasForm)
            },
            {
                path: 'entities/armadilhas',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/entities/armadilhas/armadilhas-list/armadilhas-list')
                        .then(m => m.ArmadilhasList)
            },
            {
                path: 'entities/armadilhas/:id',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/entities/armadilhas/armadilhas-detail/armadilhas-detail')
                        .then(m => m.ArmadilhasDetail)
            },
            {
                path: 'entities/armadilhas/new',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/entities/armadilhas/armadilhas-form/armadilhas-form')
                        .then(m => m.ArmadilhasForm)
            },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/dashboard/dashboard-component')
                        .then(m => m.DashboardComponent)
            },
        ]
    },


    { path: '**', redirectTo: '/map' }
];

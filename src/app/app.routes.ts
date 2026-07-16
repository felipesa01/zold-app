import { Routes } from '@angular/router';
import { QrScanComponent } from './components/shared/qr-scan-component/qr-scan-component';
import { WorkspaceComponent } from './components/layout/mode-container-component/modes/workspace-mode/workspace-component/workspace-component';
import { MapComponent } from './components/layout/mode-container-component/modes/map-mode/map-component/map-component';
import { AppShellComponent } from './components/layout/app-shell-component/app-shell-component';
import { LoginComponent } from '../auth/pages/login/login.component';
import { guestGuard } from '../auth/guards/guest.guard';
import { authGuard } from '../auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [guestGuard]
    },
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
        canActivate: [authGuard],
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
                path: 'mosquitos/capturas',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/mosquitos/capturas/capturas-list/capturas-list')
                        .then(m => m.CapturasList),
                data: { reuse: true }
            },
            {
                path: 'carrapatos/capturas-carrapatos',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/carrapatos/capturas/capturas-carrapato-list/capturas-carrapato-list')
                        .then(m => m.CapturasCarrapatosList),
                data: { reuse: true }
            },
            {
                path: 'mosquitos/capturas/new',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/mosquitos/capturas/capturas-form/capturas-form')
                        .then(m => m.CapturasForm)
            }, {
                path: 'carrapatos/capturas-carrapatos/new',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/carrapatos/capturas/capturas-carrapato-form/capturas-carrapato-form')
                        .then(m => m.CapturasCarrapatosForm)
            },
            {
                path: 'mosquitos/capturas/:id',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/mosquitos/capturas/capturas-detail/capturas-detail')
                        .then(m => m.CapturasDetail)
            },
            {
                path: 'mosquitos/capturas/:id/edit',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/mosquitos/capturas/capturas-form/capturas-form')
                        .then(m => m.CapturasForm)
            },
            {
                path: 'carrapatos/capturas-carrapatos/:id',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/carrapatos/capturas/capturas-carrapato-detail/capturas-carrapato-detail')
                        .then(m => m.CapturasCarrapatosDetail)
            },
            {
                path: 'carrapatos/capturas-carrapatos/:id/edit',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/carrapatos/capturas/capturas-carrapato-form/capturas-carrapato-form')
                        .then(m => m.CapturasCarrapatosForm)
            },
            {
                path: 'mosquitos/armadilhas',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/mosquitos/armadilhas/armadilhas-list/armadilhas-list')
                        .then(m => m.ArmadilhasList),
                data: { reuse: true }
            },
            {
                path: 'carrapatos/armadilhas-carrapatos',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/carrapatos/armadilhas/armadilhas-carrapato-list/armadilhas-carrapato-list')
                        .then(m => m.ArmadilhasCarrapatoList),
                data: { reuse: true }
            },
            {
                path: 'mosquitos/armadilhas/new',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/mosquitos/armadilhas/armadilhas-form/armadilhas-form')
                        .then(m => m.ArmadilhasForm)
            },
            {
                path: 'carrapatos/armadilhas-carrapatos/new',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/carrapatos/armadilhas/armadilhas-carrapato-form/armadilhas-carrapato-form')
                        .then(m => m.ArmadilhasCarrapatosForm)
            },
            {
                path: 'mosquitos/armadilhas/:id',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/mosquitos/armadilhas/armadilhas-detail/armadilhas-detail')
                        .then(m => m.ArmadilhasDetail)
            },
            {
                path: 'carrapatos/armadilhas-carrapatos/:id',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/carrapatos/armadilhas/armadilhas-carrapato-detail/armadilhas-carrapato-detail')
                        .then(m => m.ArmadilhasCarrapatoDetail)
            },
            {
                path: 'mosquitos/armadilhas/:id/edit',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/mosquitos/armadilhas/armadilhas-form/armadilhas-form')
                        .then(m => m.ArmadilhasForm)
            },
            {
                path: 'carrapatos/armadilhas-carrapatos/:id/edit',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/carrapatos/armadilhas/armadilhas-carrapato-form/armadilhas-carrapato-form')
                        .then(m => m.ArmadilhasCarrapatosForm)
            },
            {
                path: 'mosquitos/armadilhas/new',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/mosquitos/armadilhas/armadilhas-form/armadilhas-form')
                        .then(m => m.ArmadilhasForm)
            },
            {
                path: 'carrapatos/capturas-carrapatos/new',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/carrapatos/capturas/capturas-carrapato-form/capturas-carrapato-form')
                        .then(m => m.CapturasCarrapatosForm)
            },
            {
                path: 'inventario/exemplares',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/inventarios/exemplares/exemplar-list/exemplar-list')
                        .then(m => m.ExemplaresList),
                data: { reuse: true }
            },
            {
                path: 'inventario/exemplares/new',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/inventarios/exemplares/exemplar-form/exemplar-form')
                        .then(m => m.ExemplaresForm)
            },
            {
                path: 'inventario/exemplares/:id',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/inventarios/exemplares/exemplar-detail/exemplar-detail')
                        .then(m => m.ExemplaresDetail),
             
            },
            {
                path: 'inventario/exemplares/:id/edit',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/inventarios/exemplares/exemplar-form/exemplar-form')
                        .then(m => m.ExemplaresForm)
            },
            {
                path: 'inventario/analises',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/inventarios/analises/analises-list/analises-list')
                        .then(m => m.AnalisesList)
            },
            {
                path: 'inventario/analises/:id/edit',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/inventarios/analises/analises-form/analises-form')
                        .then(m => m.AnaliseForm)
            },
            {
                path: 'inventario/exemplares/:exemplarId/analises/new',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/inventarios/analises/analises-form/analises-form')
                        .then(m => m.AnaliseForm)
            },
            {
                path: 'inventario/exemplares/:exemplarId/analises/:id/edit',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/inventarios/analises/analises-form/analises-form')
                        .then(m => m.AnaliseForm)
            },
            {
                path: 'projetos',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/projetos/projetos-list/projetos-list')
                        .then(m => m.ProjetosList),
                data: { reuse: true }
            },
            {
                path: 'projetos/new',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/projetos/projetos-form/projetos-form')
                        .then(m => m.ProjetosForm)
            },
            {
                path: 'projetos/:id',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/projetos/projetos-detail/projetos-detail')
                        .then(m => m.ProjetosDetail)
            },
            {
                path: 'projetos/:id/edit',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/projetos/projetos-form/projetos-form')
                        .then(m => m.ProjetosForm)
            },
            {
                path: 'projetos/new',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/projetos/projetos-form/projetos-form')
                        .then(m => m.ProjetosForm)
            },
            {
                path: 'mosquitos/dashboard',
                loadComponent: () =>
                    import('./components/layout/mode-container-component/modes/workspace-mode/dashboard/dashboard-component')
                        .then(m => m.DashboardComponent)
            },
        ]
    },


    { path: '**', redirectTo: '/workspace' }
];

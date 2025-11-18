import { Routes } from '@angular/router';
import { QrScanComponent } from './components/shared/qr-scan-component/qr-scan-component';

export const routes: Routes = [
    {
        path: 'scan/:codigo',
        component: QrScanComponent
    }
];

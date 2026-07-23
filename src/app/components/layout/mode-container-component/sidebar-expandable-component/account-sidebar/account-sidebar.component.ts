import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../../../auth/services/auth.service';
import { LayoutService } from '../../../../../services/layout-service';



@Component({
    selector: 'app-account-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule
    ],
    templateUrl: './account-sidebar.component.html',
    styleUrl: './account-sidebar.component.css'
})
export class AccountSidebarComponent {

    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private sidebarControls = inject(LayoutService);

    public readonly user = this.authService.currentUser;

    public logout(): void {

        this.sidebarControls.closeExpandable();
        this.authService.logout();

        this.router.navigate(['/login']);

    }

}
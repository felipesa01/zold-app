import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-change-password',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.css'
})
export class ChangePassword {

    private readonly fb = inject(FormBuilder);
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    loading = false;
    error = '';

    form = this.fb.nonNullable.group({
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
    });

    changePassword() {

        if (this.form.invalid || this.loading) {
            return;
        }

        this.loading = true;
        this.error = '';

        this.authService.changePassword(this.form.getRawValue()).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: (err) => {
                this.loading = false;
                this.error = err?.error?.message || 'Não foi possível alterar a senha.';
            }
        });

    }

}
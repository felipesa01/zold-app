import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    private readonly fb = inject(FormBuilder);
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    public loading = false;

    public error = '';

    public readonly form = this.fb.nonNullable.group({

        email: ['', [
            Validators.required,
            Validators.email
        ]],

        senha: ['', [
            Validators.required
        ]]

    });

    constructor() { }

    public login(): void {

        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.error = '';

        this.authService.login(this.form.getRawValue())
            .pipe(
                finalize(() => this.loading = false)
            )
            .subscribe({

                next: loginResponse => {

                    if (loginResponse.mustChangePassword) {
                        this.router.navigate(['/alterar-senha']);
                    }
                    else {
                        this.authService.loadUser()
                        .subscribe(user => {
                            this.router.navigate(['/']);
                        });
                    }



                },

                error: () => {

                    this.error = 'Email ou senha inválidos.';

                }

            });

    }

}
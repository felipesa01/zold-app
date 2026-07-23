import { Component, signal } from '@angular/core';
import { AppShellComponent } from "./components/layout/app-shell-component/app-shell-component";
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [AppShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('zold-app');


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.restoreSession().subscribe();
  }
}

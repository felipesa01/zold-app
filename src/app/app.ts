import { Component, signal } from '@angular/core';
import { AppShellComponent } from "./components/layout/app-shell-component/app-shell-component";

@Component({
  selector: 'app-root',
  imports: [AppShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('zold-app');
}

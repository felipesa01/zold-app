import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './components/layout/mode-container-component/modes/map-mode/map-component/map-component';
import { AppShellComponent } from "./components/layout/app-shell-component/app-shell-component";

@Component({
  selector: 'app-root',
  imports: [AppShellComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('zold-app');
}

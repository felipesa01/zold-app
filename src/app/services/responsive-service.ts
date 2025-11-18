import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, signal } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {

  private readonly smallScreen = signal(false);

  /** Sinal reativo acessível em toda a aplicação */
  isSmallScreen = this.smallScreen.asReadonly();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map(result => result.matches))
      .subscribe(isSmall => this.smallScreen.set(isSmall));
  }
}

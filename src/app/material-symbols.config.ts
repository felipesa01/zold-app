import { makeEnvironmentProviders } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

export function registerMaterialSymbols() {
  return makeEnvironmentProviders([
    {
      provide: 'MATERIAL_SYMBOLS_INIT',
      useFactory: (iconRegistry: MatIconRegistry) => {
        // registra alias e define a font set default
        iconRegistry.registerFontClassAlias('symbols', 'material-symbols-outlined');
        iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
      },
      deps: [MatIconRegistry],
    },
  ]);
}

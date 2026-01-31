import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { Subject } from 'rxjs';
import { BottomSheetComponent } from '../components/shared/bottom-sheet-component/bottom-sheet-component';
import { BOTTOM_SHEET_DATA, BOTTOM_SHEET_REF } from '../components/shared/bottom-sheet-component/bottom-sheet.tokens';


export interface BottomSheetConfig {
  data?: any;
  initialState?: 'collapsed' | 'half' | 'expanded';
}

export interface BottomSheetRef {
  close: (value?: any) => void;
  afterClosed: () => Subject<any>;
}

@Injectable({ providedIn: 'root' })
export class BottomSheetService {
  private activeSheet?: ComponentRef<BottomSheetComponent>;

  constructor(
    private appRef: ApplicationRef,
    private envInjector: EnvironmentInjector
  ) {}

  open<T>(component: Type<T>, config: BottomSheetConfig = {}): BottomSheetRef {
    if (this.activeSheet) this.close();

    const afterClosed$ = new Subject<any>();

    const sheetRef: BottomSheetRef = {
      close: (value?: any) => {
        afterClosed$.next(value);
        afterClosed$.complete();
        this.close();
      },
      afterClosed: () => afterClosed$,
    };

    const injector = Injector.create({
      providers: [
        { provide: BOTTOM_SHEET_DATA, useValue: config.data },
        { provide: BOTTOM_SHEET_REF, useValue: sheetRef },
      ],
      parent: this.envInjector,
    });

    const container = createComponent(BottomSheetComponent, {
      environmentInjector: this.envInjector,
      elementInjector: injector,
    });

    container.instance.childComponent = component;
    container.instance.injector = injector;
    container.instance.initialState = config.initialState!;

    container.instance.requestClose.subscribe((value) => {
      sheetRef.close(value);
    });

    this.appRef.attachView(container.hostView);
    document.body.appendChild(container.location.nativeElement);

    this.activeSheet = container;
    return sheetRef;
  }

  close() {
    if (!this.activeSheet) return;

    document.body.removeChild(this.activeSheet.location.nativeElement);
    this.appRef.detachView(this.activeSheet.hostView);
    this.activeSheet.destroy();
    this.activeSheet = undefined;
  }
}

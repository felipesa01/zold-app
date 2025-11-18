import { NgComponentOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  Injector,
  Input,
  Output,
  Type,
  signal,
  effect,
  afterNextRender
} from '@angular/core';

@Component({
  selector: 'app-bottom-sheet-component',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './bottom-sheet-component.html',
  styleUrl: './bottom-sheet-component.css',
})
export class BottomSheetComponent {
  @Input() childComponent!: Type<any>;
  @Input() injector!: Injector;
  @Input() initialState: 'collapsed' | 'half' | 'expanded' = 'half';

  @Output() requestClose = new EventEmitter<any>();

  /** Alturas reais dos estados */
  heights = {
    collapsed: 8,   // só aparece a barrinha
    half: 50,       // meia tela real
    expanded: 100   // tela toda
  };

  /** translateY controlado por gesture */
  pos = signal(100); // começa fora da tela

  /** estado atual lógico */
  current: 'collapsed' | 'half' | 'expanded' = 'half';

  private dragging = false;
  private startY = 0;
  private startPos = 0;

  ngOnInit() {
    const sheet = document.querySelector('.sheet') as HTMLElement;

    // 1) desabilita animação imediatamente
    sheet.style.transition = 'none';

    // 2) aplica estado inicial sem animar
    this.setState(this.initialState, false);

    // 3) reativa animação no próximo tick
    setTimeout(() => {
      sheet.style.transition = '';
    });
  }


  /** -------------------------------------------------
   *  MUDAR ESTADO COM ANIMAÇÃO
   * -------------------------------------------------*/
  private setState(state: 'collapsed' | 'half' | 'expanded', animate = true) {
    this.current = state;
    const h = this.heights[state];
    // if (!animate) this.disableAnimationOnce();

    this.pos.set(100 - h);
  }

  /** remove animação temporariamente */
  private disableAnimationOnce() {
    const sheet = document.querySelector('.sheet') as HTMLElement;
    sheet.style.transition = 'none';
    requestAnimationFrame(() => {
      sheet.style.transition = '';
    });
  }

  /** -------------------------------------------------
   *     CLICK NO BACKDROP
   * -------------------------------------------------*/
  handleClose() {
    this.setState('collapsed');
    setTimeout(() => this.requestClose.emit(null), 200);
  }

  /** -------------------------------------------------
   *    TRANSFORM CSS
   * -------------------------------------------------*/
  transform() {
    return `translateY(${this.pos()}vh)`;
  }

  /** -------------------------------------------------
   *      DRAG SUPERIOR (GESTURE)
   * -------------------------------------------------*/
  startDrag(ev: PointerEvent) {
    if ((ev.target as HTMLElement).closest('.content')) return;

    this.dragging = true;
    this.startY = ev.clientY;
    this.startPos = this.pos();

    const move = (e: PointerEvent) => {
      if (!this.dragging) return;
      const delta = e.clientY - this.startY;
      const vhDelta = (delta / window.innerHeight) * 100;

      const newPos = Math.min(100, Math.max(0, this.startPos + vhDelta));
      this.pos.set(newPos);
    };

    const end = () => {
      this.dragging = false;
      const p = this.pos();

      if (p > 92) this.handleClose();
      else if (p > 45) this.setState('half');
      else this.setState('expanded');

      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
  }

  /** -------------------------------------------------
   *  SCROLL INTELIGENTE (ANDROID-LIKE)
   * -------------------------------------------------*/
  onScroll(ev: Event) {
    const el = ev.target as HTMLElement;

    // usuário está expanded, no topo, e puxando pra baixo
    if (this.current === 'expanded' && el.scrollTop === 0) {
      const wheel = (ev as any).deltaY;
      if (wheel < 0) return; // puxando pra cima → ignora
      this.setState('half');
    }

    // usuário half e tenta rolar pra cima → expandir
    if (this.current === 'half' && el.scrollTop === 0) {
      const wheel = (ev as any).deltaY;
      if (wheel < 0) this.setState('expanded');
    }
  }
}

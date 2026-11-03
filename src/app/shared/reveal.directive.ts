import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

// One observer for the whole page: elements are revealed once, the first time they scroll into view
let sharedObserver: IntersectionObserver | undefined;

function observer(): IntersectionObserver {
  return sharedObserver ??= new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      sharedObserver!.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
}

// Scroll reveal: `appReveal` fades and lifts, `appReveal="curtain"` unveils an image.
// The motion itself lives in styles.css (.reveal) and is skipped under prefers-reduced-motion.
@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: { class: 'reveal' }
})
export class RevealDirective implements OnInit, OnDestroy {
  appReveal = input<'' | 'curtain'>('');
  // Stagger inside a grid, in milliseconds
  revealDelay = input(0);

  private el = inject<ElementRef<HTMLElement>>(ElementRef);

  ngOnInit() {
    const node = this.el.nativeElement;
    if (this.appReveal() === 'curtain') node.classList.add('reveal--curtain');
    node.style.setProperty('--reveal-delay', `${this.revealDelay()}ms`);
    observer().observe(node);
  }

  ngOnDestroy() {
    sharedObserver?.unobserve(this.el.nativeElement);
  }
}

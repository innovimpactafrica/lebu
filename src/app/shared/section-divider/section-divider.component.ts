import { AfterViewInit, Component, ElementRef, OnDestroy, inject, input, signal } from '@angular/core';
import { LangService } from '../lang.service';
import { Bilingual } from '../../data/rooms.data';

// Editorial separator between home sections: index, hairlines drawn on scroll, Lébou diamond, next section name
@Component({
  selector: 'app-section-divider',
  standalone: true,
  templateUrl: './section-divider.component.html',
  host: { class: 'block' }
})
export class SectionDividerComponent implements AfterViewInit, OnDestroy {
  langService = inject(LangService);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  index = input.required<string>();
  label = input.required<Bilingual>();

  visible = signal(false);
  private observer?: IntersectionObserver;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.visible.set(true);
        this.observer?.disconnect();
      }
    }, { threshold: 0.6 });
    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}

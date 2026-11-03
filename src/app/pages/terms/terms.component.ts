import { AfterViewInit, Component, ElementRef, OnDestroy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowLeft, ArrowRight, ArrowUpRight, LucideAngularModule, Mail, MapPin, Phone, Printer } from 'lucide-angular';
import { LangService } from '../../shared/lang.service';
import { BookingService } from '../../shared/booking.service';
import { Bilingual } from '../../data/rooms.data';
import { TERMS_ARTICLES, TERMS_ESSENTIALS, TERMS_VERSION } from '../../data/terms.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, RevealDirective],
  templateUrl: './terms.component.html'
})
export class TermsComponent implements AfterViewInit, OnDestroy {
  langService = inject(LangService);
  private booking = inject(BookingService);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly icons = { ArrowLeft, ArrowRight, ArrowUpRight, Mail, MapPin, Phone, Printer };

  readonly articles = TERMS_ARTICLES;
  readonly essentials = TERMS_ESSENTIALS;
  readonly version = TERMS_VERSION;

  // Article currently being read, highlighted in the table of contents
  active = signal(1);
  private observer?: IntersectionObserver;

  ngAfterViewInit() {
    // An article counts as read once it crosses the upper third of the viewport
    this.observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) this.active.set(Number((entry.target as HTMLElement).dataset['article']));
      }
    }, { rootMargin: '-30% 0px -60% 0px' });
    this.host.nativeElement.querySelectorAll('[data-article]').forEach(el => this.observer!.observe(el));
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  t(text: Bilingual): string {
    return this.langService.currentLang() === 'fr' ? text.fr : text.en;
  }

  num(n: number): string {
    return String(n).padStart(2, '0');
  }

  // Buttons rather than #fragments: with <base href="/"> a plain hash link would go back to the home page
  goTo(article: number) {
    document.getElementById('article-' + article)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  print() {
    window.print();
  }

  book() {
    this.booking.open();
  }
}

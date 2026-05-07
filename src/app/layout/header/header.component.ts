import { Component, HostListener, inject, signal } from '@angular/core';
import { LangService } from '../../shared/lang.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  langService = inject(LangService);
  isScrolled = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 80);
  }

  setLang(lang: 'fr' | 'en') {
    this.langService.setLang(lang);
  }
}

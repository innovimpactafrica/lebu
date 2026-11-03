import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { LangService } from '../../shared/lang.service';
import { ThemeService } from '../../shared/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  langService = inject(LangService);
  themeService = inject(ThemeService);
  readonly icons = { Moon, Sun };
  isScrolled = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 80);
  }

  setLang(lang: 'fr' | 'en') {
    this.langService.setLang(lang);
  }
}

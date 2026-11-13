import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, effect, inject, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ConciergeBell, LucideAngularModule, MapPin, Menu, Moon, Phone, Sun, X } from 'lucide-angular';
import { LangService } from '../../shared/lang.service';
import { ThemeService } from '../../shared/theme.service';
import { BookingService } from '../../shared/booking.service';
import { HOTEL_MAPS_URL, HOTEL_PHONE } from '../../shared/contact';
import { TranslocoPipe } from '@jsverse/transloco';

interface MenuLink {
  // Home section anchor, or a page path when there is no fragment
  path: string;
  fragment?: string;
  labelKey?: string;
  label?: string;
  highlight?: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslocoPipe, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  langService = inject(LangService);
  themeService = inject(ThemeService);
  booking = inject(BookingService);
  private document = inject(DOCUMENT);

  readonly icons = { Moon, Sun, Menu, X, ConciergeBell, Phone, MapPin };
  readonly phone = HOTEL_PHONE;
  readonly mapsUrl = HOTEL_MAPS_URL;
  isScrolled = signal(false);
  menuOpen = signal(false);

  // Same order as the home sections, so the numbers match the section dividers
  readonly menuLinks: MenuLink[] = [
    { path: '/', fragment: 'about', labelKey: 'header.about' },
    { path: '/conciergerie', labelKey: 'common.concierge', highlight: true },
    { path: '/', fragment: 'rooms', labelKey: 'common.accommodations' },
    { path: '/', fragment: 'galerie', labelKey: 'common.gallery' },
    { path: '/', fragment: 'services', labelKey: 'header.services' },
    { path: '/', fragment: 'rooftop', label: 'Rooftop' },
  ];

  private menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');
  private closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');

  constructor() {
    // The page behind the open menu must not scroll
    effect(() => {
      this.document.documentElement.style.overflow = this.menuOpen() ? 'hidden' : '';
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 80);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.menuOpen()) this.closeMenu(true);
  }

  // The menu only exists below md; rotating a tablet to landscape must not leave it open
  @HostListener('window:resize')
  onResize() {
    if (this.menuOpen() && window.innerWidth >= 768) this.closeMenu();
  }

  openMenu() {
    this.menuOpen.set(true);
    // Keyboard and screen reader users land inside the menu
    setTimeout(() => this.closeButton()?.nativeElement.focus());
  }

  closeMenu(restoreFocus = false) {
    this.menuOpen.set(false);
    if (restoreFocus) setTimeout(() => this.menuButton()?.nativeElement.focus());
  }

  bookFromMenu() {
    this.closeMenu();
    this.booking.open();
  }

  setLang(lang: 'fr' | 'en') {
    this.langService.setLang(lang);
  }
}

import { Injectable, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';

export type Lang = 'fr' | 'en';

const STORAGE_KEY = 'lebu-lang';

// Saved choice first, then the browser's preferred languages, French by default
export function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'fr' || saved === 'en') return saved;
  } catch (e) {}
  for (const lang of navigator.languages ?? [navigator.language]) {
    const code = lang?.slice(0, 2).toLowerCase();
    if (code === 'fr' || code === 'en') return code;
  }
  return 'fr';
}

@Injectable({
  providedIn: 'root'
})
export class LangService {
  private transloco = inject(TranslocoService);
  private document = inject(DOCUMENT);

  // Still read directly by components to pick the right side of bilingual data ({ fr, en })
  currentLang = signal<Lang>(this.transloco.getActiveLang() as Lang);

  constructor() {
    this.document.documentElement.lang = this.currentLang();
  }

  // Plural form for translation keys: French uses the singular for 0 and 1, English only for 1
  plural(count: number): 'one' | 'other' {
    return (this.currentLang() === 'fr' ? count <= 1 : count === 1) ? 'one' : 'other';
  }

  setLang(lang: Lang) {
    this.transloco.setActiveLang(lang);
    this.currentLang.set(lang);
    this.document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }
}

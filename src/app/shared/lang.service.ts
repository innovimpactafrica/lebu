import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  currentLang = signal<'fr' | 'en'>('fr');

  setLang(lang: 'fr' | 'en') {
    this.currentLang.set(lang);
  }
}

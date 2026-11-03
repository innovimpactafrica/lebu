import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'lebu-theme';

// Light (brochure cream) is the default; the visitor's choice is remembered.
// index.html applies the saved theme before boot, this service keeps it in sync.
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(document.documentElement.dataset['theme'] === 'dark' ? 'dark' : 'light');

  toggle() {
    this.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme) {
    this.theme.set(theme);
    if (theme === 'dark') {
      document.documentElement.dataset['theme'] = 'dark';
    } else {
      delete document.documentElement.dataset['theme'];
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Private mode or blocked storage: the theme still applies for this visit
    }
  }
}

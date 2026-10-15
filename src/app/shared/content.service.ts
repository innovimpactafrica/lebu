import { Injectable } from '@angular/core';

interface Paragraph {
  fr: string;
  en: string;
}

interface ContentModel {
  paragraphs: Paragraph[];
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  private storageKey = 'lebu-content-v2';
  content: ContentModel;

  constructor() {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      try {
        this.content = JSON.parse(raw);
      } catch (e) {
        this.content = this.defaultContent();
      }
    } else {
      this.content = this.defaultContent();
    }
  }

  private defaultContent(): ContentModel {
    return {
      paragraphs: [
        {
          fr: "LEBU Appart & Suites est né d'une conviction : Dakar mérite une offre d'hébergement qui conjugue l'excellence internationale et l'authenticité de la culture Lébou. Notre résidence de 36 unités réinvente le séjour longue durée avec l'élégance des grandes adresses africaines.",
          en: "LEBU Appart & Suites was born from a conviction: Dakar deserves accommodation that combines international excellence with the authenticity of Lébou culture. Our 36-unit residence reinvents the long stay with the elegance of Africa's finest addresses."
        },
        {
          fr: "Les Lébou, premiers habitants de la presqu'île du Cap-Vert, ont façonné l'âme de Dakar. LEBU rend hommage à leurs valeurs et à leur héritage, jusque dans son identité visuelle inspirée de l'art des pirogues de Yoff.",
          en: "The Lébou, first inhabitants of the Cap-Vert peninsula, shaped the soul of Dakar. LEBU pays tribute to their values and heritage, down to a visual identity inspired by the art of the Yoff pirogues."
        }
      ]
    };
  }

  private persist() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.content));
    } catch (e) {
      console.warn('Could not persist content to LocalStorage', e);
    }
  }

  async updateParagraph(index: number, fr: string, en?: string) {
    if (!this.content.paragraphs[index]) return;
    const newEn = en && en.trim().length ? en : await this.translateAuto(fr, 'fr', 'en');
    this.content.paragraphs[index] = { fr, en: newEn };
    this.persist();
  }

  private async translateAuto(text: string, from = 'fr', to = 'en'): Promise<string> {
    // Try public LibreTranslate instance, fallback to simple marker if network fails.
    try {
      const res = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text, source: from, target: to, format: 'text' })
      });
      if (!res.ok) throw new Error('translate API failed');
      const json = await res.json();
      return json.translatedText || (text + ' (auto)');
    } catch (e) {
      return text + ' (auto)';
    }
  }
}

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
  private storageKey = 'lebu-content';
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
          fr: "Lebu Appart&Suites incarne l'élégance contemporaine mêlée aux richesses culturelles du Sénégal. Chaque appartement est conçu pour offrir un espace de vie raffiné, où le luxe rencontre l'authenticité africaine.",
          en: "Lebu Appart&Suites embodies contemporary elegance blended with Senegal's cultural richness. Each apartment is designed to offer a refined living space where luxury meets African authenticity."
        },
        {
          fr: "Niché dans la ville de Dakar, notre résidence hôtelière offre une expérience unique alliant confort absolu, service personnalisé et panoramas époustouflants sur la capitale sénégalaise.",
          en: "Nestled in the city of Dakar, our hotel residence offers a unique experience combining absolute comfort, personalized service, and breathtaking views of the Senegalese capital."
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

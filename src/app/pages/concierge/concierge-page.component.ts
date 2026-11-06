import { Component, computed, inject, signal } from '@angular/core';
import { Location, NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  ArrowLeft, Clock, ConciergeBell, LucideAngularModule, MapPin, Navigation, Phone, Search, Sparkles, Tag, X
} from 'lucide-angular';
import { LangService } from '../../shared/lang.service';
import { Bilingual } from '../../data/rooms.data';
import { CONCIERGE_RUBRICS, ConciergePlace, ConciergeRubric } from '../../data/concierge.data';
import { TranslocoPipe } from '@jsverse/transloco';

interface PhonePart {
  text: string;
  href?: string;
}

const RECEPTION_PHONE = '+221710537979';

// Lower case without accents, so "cafe" finds "Café"
const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

@Component({
  selector: 'app-concierge-page',
  standalone: true,
  imports: [TranslocoPipe, RouterLink, NgTemplateOutlet, LucideAngularModule],
  templateUrl: './concierge-page.component.html'
})
export class ConciergePageComponent {
  langService = inject(LangService);
  private location = inject(Location);
  readonly icons = { ArrowLeft, Clock, ConciergeBell, MapPin, Navigation, Phone, Search, Sparkles, Tag, X };

  readonly rubrics = CONCIERGE_RUBRICS;
  readonly total = CONCIERGE_RUBRICS.reduce((sum, rubric) => sum + rubric.places.length, 0);
  readonly receptionPhone = RECEPTION_PHONE;
  readonly emergencies = [
    { number: '17', label: { fr: 'Police', en: 'Police' } },
    { number: '18', label: { fr: 'Pompiers', en: 'Fire brigade' } },
    { number: '1515', label: { fr: 'SAMU', en: 'Ambulance' } },
  ];

  // Rubric from /conciergerie/:rubric, first one otherwise
  active = signal(this.findRubric(inject(ActivatedRoute).snapshot.paramMap.get('rubric')) ?? CONCIERGE_RUBRICS[0]);
  query = signal('');

  // Search runs across every rubric; results stay grouped by rubric
  results = computed(() => {
    const q = normalize(this.query().trim());
    if (!q) return [];
    return this.rubrics
      .map(rubric => ({
        rubric,
        // Both languages, so a French word still finds a place while browsing in English
        places: rubric.places.filter(place => normalize([...Object.values(place), ...Object.values(place.en ?? {})].filter(v => typeof v === 'string').join(' ')).includes(q)),
      }))
      .filter(group => group.places.length);
  });
  resultCount = computed(() => this.results().reduce((sum, group) => sum + group.places.length, 0));

  select(rubric: ConciergeRubric) {
    this.active.set(rubric);
    this.query.set('');
    // Shareable URL without a router navigation, which would scroll back to the top
    this.location.replaceState('/conciergerie/' + rubric.slug);
    document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  t(text: Bilingual): string {
    return this.langService.currentLang() === 'fr' ? text.fr : text.en;
  }

  // English version of a place field when there is one, French otherwise
  field(place: ConciergePlace, key: keyof NonNullable<ConciergePlace['en']>): string | undefined {
    return (this.langService.currentLang() === 'en' && place.en?.[key]) || place[key];
  }

  num(n: number): string {
    return String(n).padStart(2, '0');
  }

  // "33 889 22 00 (service client)" or "Pullman : 33 889 22 00 · Noom : 33 869 33 33": only the numbers become links
  phoneParts(tel: string): PhonePart[] {
    if (/^\d{2,4}$/.test(tel)) return [{ text: tel, href: 'tel:' + tel }];
    return tel.split(/(\d{2,3}(?: \d{2,3}){3})/).filter(Boolean).map(text =>
      /^\d{2,3}(?: \d{2,3}){3}$/.test(text) ? { text, href: 'tel:+221' + text.replace(/ /g, '') } : { text }
    );
  }

  private findRubric(slug: string | null): ConciergeRubric | undefined {
    return this.rubrics.find(rubric => rubric.slug === slug);
  }
}

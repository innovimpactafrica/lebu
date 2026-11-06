import { Component, inject, signal } from '@angular/core';
import { ArrowRight, ArrowUpRight, LucideAngularModule, ShieldPlus } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { LangService } from '../../shared/lang.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { Bilingual } from '../../data/rooms.data';
import { TranslocoPipe } from '@jsverse/transloco';

interface Rubric {
  slug: string;
  title: Bilingual;
  lead: Bilingual;
}

@Component({
  selector: 'app-concierge',
  standalone: true,
  imports: [TranslocoPipe, RouterLink, LucideAngularModule, RevealDirective],
  templateUrl: './concierge.component.html'
})
export class ConciergeComponent {
  langService = inject(LangService);
  readonly icons = { ArrowRight, ArrowUpRight, ShieldPlus };
  // Counts come from the concierge guide data, loaded apart so the 127 places stay out of the home bundle
  readonly totals = signal<{ addresses?: number; rubrics?: number }>({});
  private counts = signal<Record<string, number>>({});

  // Teaser of six rubrics
  readonly rubrics: Rubric[] = [
    {
      slug: 'sites-culture',
      title: { fr: 'Sites incontournables', en: 'Must-see sights' },
      lead: { fr: 'Les incontournables de Dakar et les grandes excursions du Sénégal.', en: "Dakar's landmarks and Senegal's great excursions." },
    },
    {
      slug: 'restaurants',
      title: { fr: 'Restaurants & gourmandises', en: 'Restaurants & treats' },
      lead: { fr: 'Nos tables préférées, au Plateau, en bord de mer, et quelques pauses sucrées.', en: 'Our favourite tables, in Plateau, by the sea, and a few sweet stops.' },
    },
    {
      slug: 'activites',
      title: { fr: 'Activités & visites', en: 'Activities & visits' },
      lead: { fr: 'Monuments, musées, panoramas et culture vivante.', en: 'Monuments, museums, viewpoints and living culture.' },
    },
    {
      slug: 'plages',
      title: { fr: 'Plages & nautisme', en: 'Beaches & water sports' },
      lead: { fr: 'Plages publiques, plages privées et sports de glisse.', en: 'Public beaches, private beaches and board sports.' },
    },
    {
      slug: 'soirees-sorties',
      title: { fr: 'Soirées & sorties', en: 'Nights out' },
      lead: { fr: 'Concerts, sorties, piscines et escapades pour vos soirées et week-ends.', en: 'Concerts, outings, pools and getaways for your evenings and weekends.' },
    },
    {
      slug: 'marches-shopping',
      title: { fr: 'Marchés & shopping', en: 'Markets & shopping' },
      lead: { fr: 'Marchés authentiques, artisanat et tissus. Pensez à marchander.', en: 'Authentic markets, crafts and fabrics. Remember to haggle.' },
    },
  ];

  t(text: Bilingual): string {
    return this.langService.currentLang() === 'fr' ? text.fr : text.en;
  }

  constructor() {
    import('../../data/concierge.data').then(({ CONCIERGE_RUBRICS }) => {
      this.counts.set(Object.fromEntries(CONCIERGE_RUBRICS.map(rubric => [rubric.slug, rubric.places.length])));
      this.totals.set({
        addresses: CONCIERGE_RUBRICS.reduce((sum, rubric) => sum + rubric.places.length, 0),
        rubrics: CONCIERGE_RUBRICS.length,
      });
    });
  }

  count(slug: string): number | undefined {
    return this.counts()[slug];
  }

  num(n: number): string {
    return String(n).padStart(2, '0');
  }
}

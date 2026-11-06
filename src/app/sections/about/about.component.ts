import { Component, inject } from '@angular/core';
import { LangService } from '../../shared/lang.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslocoPipe, RevealDirective],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  langService = inject(LangService);

  // Brochure "Notre Vision" and "Héritage Lébou" texts
  readonly paragraphs = [
    {
      heading: { fr: 'Notre Vision', en: 'Our Vision' },
      text: {
        fr: "LEBU Appart & Suites est né d'une conviction : Dakar mérite une offre d'hébergement qui conjugue l'excellence internationale et l'authenticité de la culture Lébou. Notre résidence de 36 unités réinvente le séjour longue durée avec l'élégance des grandes adresses africaines.",
        en: "LEBU Appart & Suites was born from a conviction: Dakar deserves accommodation that combines international excellence with the authenticity of Lébou culture. Our 36-unit residence reinvents the long stay with the elegance of Africa's finest addresses.",
      },
    },
    {
      heading: { fr: 'Héritage Lébou', en: 'Lébou Heritage' },
      text: {
        fr: "Les Lébou, premiers habitants de la presqu'île du Cap-Vert, ont façonné l'âme de Dakar. LEBU rend hommage à leurs valeurs et à leur héritage, jusque dans son identité visuelle inspirée de l'art des pirogues de Yoff.",
        en: "The Lébou, first inhabitants of the Cap-Vert peninsula, shaped the soul of Dakar. LEBU pays tribute to their values and heritage, down to a visual identity inspired by the art of the Yoff pirogues.",
      },
    },
  ];

  // Brochure "Concept & Héritage" pillars
  readonly pillars = [
    {
      title: { fr: 'Service', en: 'Service' },
      text: { fr: 'Équipe dédiée 24h/24 autour d\'une hospitalité authentique.', en: 'A dedicated 24/7 team built around authentic hospitality.' },
    },
    {
      title: { fr: 'Culture', en: 'Culture' },
      text: { fr: 'Identité visuelle ancrée dans l\'art des pirogues de Yoff.', en: 'A visual identity rooted in the art of the Yoff pirogues.' },
    },
    {
      title: { fr: 'Confort', en: 'Comfort' },
      text: { fr: 'Appartements entièrement équipés, courts et longs séjours.', en: 'Fully equipped apartments for short and long stays.' },
    },
  ];

  stats = [
    { num: '36', labelFr: 'Suites', labelEn: 'Suites' },
    { num: '5', labelFr: 'Catégories de suites', labelEn: 'Suite categories' },
    { num: '24/7', labelFr: 'Assistance dédiée', labelEn: 'Dedicated assistance' }
  ];
}

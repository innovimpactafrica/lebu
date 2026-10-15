import { Component, inject } from '@angular/core';
import {
  Briefcase, CarTaxiFront, ConciergeBell, Dumbbell, LucideAngularModule, LucideIconData, ShieldCheck, Utensils
} from 'lucide-angular';
import { LangService } from '../../shared/lang.service';

interface Bilingual {
  fr: string;
  en: string;
}

interface Service {
  icon: LucideIconData;
  category: Bilingual;
  title: Bilingual;
  text: Bilingual;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  langService = inject(LangService);

  // Source: Lebu brochure, "Services & Expérience"
  readonly services: Service[] = [
    {
      icon: ConciergeBell,
      category: { fr: 'Accueil', en: 'Welcome' },
      title: { fr: 'Réception & Conciergerie', en: 'Reception & Concierge' },
      text: {
        fr: 'Équipe multilingue disponible 24h/24. Transferts aéroport, réservations et excursions : chaque demande est anticipée.',
        en: 'Multilingual team available 24/7. Airport transfers, bookings and excursions: every request is anticipated.',
      },
    },
    {
      icon: Briefcase,
      category: { fr: 'Business', en: 'Business' },
      title: { fr: 'Centre d\'affaires', en: 'Business centre' },
      text: {
        fr: 'Coworking haut débit, salles de réunion. La base idéale pour les professionnels en déplacement.',
        en: 'High-speed coworking and meeting rooms. The ideal base for business travellers.',
      },
    },
    {
      icon: Dumbbell,
      category: { fr: 'Bien-être', en: 'Wellness' },
      title: { fr: 'Détente & Wellness', en: 'Relaxation & Wellness' },
      text: {
        fr: 'Salle de fitness, partenariats spa, yoga sur terrasse avec vue sur l\'Atlantique sénégalais.',
        en: 'Fitness room, spa partnerships, terrace yoga overlooking the Senegalese Atlantic.',
      },
    },
    {
      icon: Utensils,
      category: { fr: 'Restauration', en: 'Dining' },
      title: { fr: 'Gastronomie', en: 'Gastronomy' },
      text: {
        fr: 'Petit-déjeuner avec produits locaux de qualité, partenariats avec les meilleures tables dakaroises.',
        en: 'Breakfast with quality local produce, partnerships with the finest tables in Dakar.',
      },
    },
    {
      icon: ShieldCheck,
      category: { fr: 'Sécurité', en: 'Security' },
      title: { fr: 'Sûreté & Tranquillité', en: 'Safety & Peace of mind' },
      text: {
        fr: 'Vidéosurveillance et agent de sécurité 24h/24.',
        en: 'Video surveillance and a security guard 24/7.',
      },
    },
    {
      icon: CarTaxiFront,
      category: { fr: 'Mobilité', en: 'Mobility' },
      title: { fr: 'Transports & Déplacements', en: 'Transport & Travel' },
      text: {
        fr: 'Partenariat taxi fiable, chauffeur privé, à proximité directe du centre d\'affaires du Plateau.',
        en: 'Reliable taxi partner, private driver, right next to the Plateau business district.',
      },
    },
  ];

  t(text: Bilingual): string {
    return this.langService.currentLang() === 'fr' ? text.fr : text.en;
  }
}

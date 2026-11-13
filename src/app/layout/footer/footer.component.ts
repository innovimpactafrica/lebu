import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Mail, MapPin, Phone, Plane } from 'lucide-angular';
import { LangService } from '../../shared/lang.service';
import { ROOM_CATEGORIES } from '../../data/rooms.data';
import { HOTEL_MAPS_URL } from '../../shared/contact';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslocoPipe, RouterLink, LucideAngularModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  langService = inject(LangService);
  readonly rooms = ROOM_CATEGORIES;
  readonly icons = { MapPin, Phone, Mail, Plane };
  readonly year = new Date().getFullYear();
  readonly mapsUrl = HOTEL_MAPS_URL;

  // Each link lands on its own service card; the concierge has its own page
  readonly services = [
    { fr: 'Réception 24/7', en: '24/7 Reception', path: '/', anchor: 'service-reception' },
    { fr: 'Conciergerie & bonnes adresses', en: 'Concierge & local guide', path: '/conciergerie' },
    { fr: 'Centre d\'affaires', en: 'Business centre', path: '/', anchor: 'service-affaires' },
    { fr: 'Détente & Wellness', en: 'Relaxation & Wellness', path: '/', anchor: 'service-bien-etre' },
    { fr: 'Gastronomie', en: 'Gastronomy', path: '/', anchor: 'service-gastronomie' },
    { fr: 'Rooftop & Bar Lounge', en: 'Rooftop & Bar Lounge', path: '/', anchor: 'rooftop' },
    { fr: 'Transports & Chauffeur', en: 'Transport & Driver', path: '/', anchor: 'service-transports' },
  ];
}

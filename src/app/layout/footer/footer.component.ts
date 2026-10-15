import { Component, inject } from '@angular/core';
import { LucideAngularModule, Mail, MapPin, Phone, Plane } from 'lucide-angular';
import { LangService } from '../../shared/lang.service';
import { ROOM_CATEGORIES } from '../../data/rooms.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  langService = inject(LangService);
  readonly rooms = ROOM_CATEGORIES;
  readonly icons = { MapPin, Phone, Mail, Plane };
  readonly year = new Date().getFullYear();

  readonly services = [
    { fr: 'Réception & Conciergerie 24/7', en: '24/7 Reception & Concierge' },
    { fr: 'Centre d\'affaires', en: 'Business centre' },
    { fr: 'Fitness & Wellness', en: 'Fitness & Wellness' },
    { fr: 'Gastronomie', en: 'Gastronomy' },
    { fr: 'Rooftop & Bar Lounge', en: 'Rooftop & Bar Lounge' },
    { fr: 'Transports & Chauffeur', en: 'Transport & Driver' },
  ];
}

import { Component, inject } from '@angular/core';
import { ArrowRight, Citrus, GlassWater, Leaf, LucideAngularModule, LucideIconData, Sunset, Utensils } from 'lucide-angular';
import { LangService } from '../../shared/lang.service';
import { BookingService } from '../../shared/booking.service';

interface Signature {
  icon: LucideIconData;
  title: { fr: string; en: string };
  text: { fr: string; en: string };
}

@Component({
  selector: 'app-rooftop',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './rooftop.component.html'
})
export class RooftopComponent {
  langService = inject(LangService);
  private booking = inject(BookingService);
  readonly icons = { Sunset, ArrowRight };

  // Source: Lebu brochure, "Rooftop & Bar Lounge"
  readonly signatures: Signature[] = [
    {
      icon: GlassWater,
      title: { fr: 'Mocktails signature', en: 'Signature mocktails' },
      text: { fr: 'Au bissap, la fleur d\'hibiscus emblématique', en: 'With bissap, the iconic hibiscus flower' },
    },
    {
      icon: Leaf,
      title: { fr: 'Bouye', en: 'Bouye' },
      text: { fr: 'Le fruit du baobab, onctueux et vitaminé', en: 'Creamy, vitamin-rich baobab fruit' },
    },
    {
      icon: Citrus,
      title: { fr: 'Pressés minute', en: 'Freshly squeezed' },
      text: { fr: 'Jus de fruits frais préparés à la demande', en: 'Fresh fruit juices made to order' },
    },
    {
      icon: Utensils,
      title: { fr: 'Tapas Dakar – Asie', en: 'Dakar – Asia tapas' },
      text: { fr: 'Tradition locale et modernité', en: 'Local tradition meets modernity' },
    },
  ];

  t(text: { fr: string; en: string }): string {
    return this.langService.currentLang() === 'fr' ? text.fr : text.en;
  }

  book() {
    this.booking.open();
  }
}

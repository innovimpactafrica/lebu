import { Component, ElementRef, HostListener, OnDestroy, inject, signal, viewChild } from '@angular/core';
import {
  ArrowRight, Building2, ConciergeBell, LucideAngularModule, LucideIconData,
  MapPin, Maximize2, ShoppingBag, ShowerHead, Sparkles, Tv, Wifi, X
} from 'lucide-angular';
import { LangService } from '../../shared/lang.service';
import { BookingService } from '../../shared/booking.service';
import { RevealDirective } from '../../shared/reveal.directive';

interface Highlight {
  icon: LucideIconData;
  fr: string;
  en: string;
}

interface GallerySpace {
  id: string;
  image: string;
  large?: boolean;
  labelFr: string;
  labelEn: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  highlights: Highlight[];
}

// Delay before a hover opens the details, so scrolling past a tile does not trigger it
const HOVER_OPEN_DELAY = 450;
const HOVER_CLOSE_DELAY = 250;
@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [LucideAngularModule, RevealDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnDestroy {
  public langService = inject(LangService);
  private booking = inject(BookingService);
  readonly icons = { X, ArrowRight, Maximize2 };

  // Texts aligned with the Lebu brochure
  spaces: GallerySpace[] = [
    {
      id: 'facade', image: 'building.jpeg', large: true,
      labelFr: 'Façade', labelEn: 'Exterior',
      titleFr: 'Architecture contemporaine', titleEn: 'Contemporary architecture',
      descFr: 'Une façade aux lignes épurées qui marie modernité et inspirations sénégalaises. Au sein du Complexe Neptune, au Plateau, la résidence accueille 36 suites réparties sur plusieurs étages, dont le Club Lebu.',
      descEn: 'A clean-lined façade blending modernity with Senegalese inspiration. Within the Neptune complex in Plateau, the residence houses 36 suites across several floors, including the Club Lebu.',
      highlights: [
        { icon: Building2, fr: '36 suites', en: '36 suites' },
        { icon: Sparkles, fr: 'Club Lebu — étages 6 à 8', en: 'Club Lebu — floors 6 to 8' },
        { icon: MapPin, fr: '22 rue Wagane Diouf, Plateau', en: '22 rue Wagane Diouf, Plateau' },
      ]
    },
    {
      id: 'reception', image: 'accueil.png',
      labelFr: 'Accueil', labelEn: 'Reception',
      titleFr: 'Un accueil chaleureux', titleEn: 'A warm welcome',
      descFr: 'Un hall lumineux où notre équipe multilingue vous reçoit 24h/24 : transferts aéroport, réservations et excursions, chaque demande est anticipée.',
      descEn: 'A bright lobby where our multilingual team welcomes you 24/7: airport transfers, bookings and excursions, every request is anticipated.',
      highlights: [
        { icon: ConciergeBell, fr: 'Réception 24h/24', en: '24/7 reception' },
        { icon: Sparkles, fr: 'Équipe multilingue', en: 'Multilingual team' },
      ]
    },
    {
      id: 'salon', image: 'salon.jpeg',
      labelFr: 'Salon', labelEn: 'Living room',
      titleFr: 'Des espaces de vie généreux', titleEn: 'Generous living spaces',
      descFr: 'Des salons meublés avec soin, pensés pour se détendre ou recevoir, avec tout le confort d’un appartement et les services d’un hôtel.',
      descEn: 'Carefully furnished lounges designed for relaxing or entertaining, with the comfort of an apartment and the services of a hotel.',
      highlights: [
        { icon: Wifi, fr: 'Wi-Fi fibre', en: 'Fibre Wi-Fi' },
        { icon: Tv, fr: 'Smart TV 4K', en: '4K Smart TV' },
      ]
    },
    {
      id: 'bathroom', image: 'toilet.jpeg',
      labelFr: 'Salle de bain', labelEn: 'Bathroom',
      titleFr: 'Salles de bain raffinées', titleEn: 'Refined bathrooms',
      descFr: 'Des matériaux nobles et des finitions soignées pour un moment de détente, du Standard au Penthouse.',
      descEn: 'Fine materials and careful finishes for a moment of relaxation, from Standard to Penthouse.',
      highlights: [
        { icon: ShowerHead, fr: 'Douche à l\'italienne ou effet pluie', en: 'Walk-in or rain shower' },
        { icon: Sparkles, fr: 'Finitions haut de gamme', en: 'High-end finishes' },
      ]
    },
    {
      id: 'retail', image: 'commerces.jpeg',
      labelFr: 'Commerces', labelEn: 'Retail',
      titleFr: 'Commerces de proximité', titleEn: 'Nearby shops',
      descFr: 'Boutiques et services à proximité immédiate, au cœur du Plateau, le centre d\'affaires de Dakar. La plage est à 15 minutes à pied.',
      descEn: 'Shops and services right next door, in the heart of Plateau, Dakar\'s business district. The beach is a 15-minute walk away.',
      highlights: [
        { icon: ShoppingBag, fr: 'Boutiques & services', en: 'Shops & services' },
        { icon: MapPin, fr: 'Plage à 15 min à pied · AIBD à 60 min', en: 'Beach 15 min walk · AIBD airport 60 min' },
      ]
    },
  ];

  active = signal<GallerySpace | null>(null);

  private closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');
  private openTimer?: ReturnType<typeof setTimeout>;
  private closeTimer?: ReturnType<typeof setTimeout>;

  // Hover intent only for real mouse pointers; touch and keyboard use click
  onTileEnter(space: GallerySpace, e: PointerEvent) {
    if (e.pointerType !== 'mouse') return;
    this.clearTimers();
    this.openTimer = setTimeout(() => this.active.set(space), HOVER_OPEN_DELAY);
  }

  onTileLeave() {
    clearTimeout(this.openTimer);
  }

  openNow(space: GallerySpace) {
    this.clearTimers();
    this.active.set(space);
    setTimeout(() => this.closeBtn()?.nativeElement.focus());
  }

  onPanelEnter() {
    clearTimeout(this.closeTimer);
  }

  onPanelLeave(e: PointerEvent) {
    if (e.pointerType !== 'mouse') return;
    this.closeTimer = setTimeout(() => this.close(), HOVER_CLOSE_DELAY);
  }

  @HostListener('document:keydown.escape')
  close() {
    this.clearTimers();
    this.active.set(null);
  }

  book() {
    this.close();
    this.booking.open();
  }

  ngOnDestroy() {
    this.clearTimers();
  }

  private clearTimers() {
    clearTimeout(this.openTimer);
    clearTimeout(this.closeTimer);
  }
}

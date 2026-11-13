import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { ArrowRight, Check, Clock, Crown, Leaf, LucideAngularModule, Ruler, Users } from 'lucide-angular';
import { LangService } from '../../shared/lang.service';
import { BookingService } from '../../shared/booking.service';
import {
  CLUB_FLOORS, CLUB_PERKS, ROOM_CATEGORIES, RoomCategory, RoomOffer, RoomVersion, SHARED_AMENITIES,
  clubUpgradeDelta, formatPrice
} from '../../data/rooms.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { TranslocoPipe } from '@jsverse/transloco';

interface RoomCard {
  category: RoomCategory;
  offer: RoomOffer;
  version: RoomVersion;
  // Category only sold as Club (Standard, Penthouse)
  clubOnly: boolean;
  upgradeDelta: number | null;
}
@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [TranslocoPipe, LucideAngularModule, RevealDirective],
  templateUrl: './rooms.component.html'
})
export class RoomsComponent {
  langService = inject(LangService);
  private booking = inject(BookingService);
  readonly icons = { Ruler, Users, Leaf, Crown, Check, Clock, ArrowRight };
  readonly amenities = SHARED_AMENITIES;
  readonly clubPerks = CLUB_PERKS;
  readonly clubFloors = CLUB_FLOORS;
  readonly formatPrice = formatPrice;

  version = signal<RoomVersion>('classic');

  // Each mode only lists the categories sold in that version (as in the PMS)
  cards = computed<RoomCard[]>(() => {
    const mode = this.version();
    return ROOM_CATEGORIES
      .filter(category => !!category.offers[mode])
      .map(category => ({
        category,
        offer: category.offers[mode]!,
        version: mode,
        clubOnly: !category.offers.classic,
        upgradeDelta: clubUpgradeDelta(category),
      }));
  });

  // Shown under the Classic grid so they are not missed
  readonly clubExclusives = ROOM_CATEGORIES.filter(c => !c.offers.classic);

  private versionSelector = viewChild<ElementRef<HTMLElement>>('versionSelector');

  setVersion(version: RoomVersion) {
    this.version.set(version);
  }

  // From the bottom of the grid: switch, then bring the selector and the first Club card into view
  discoverClub() {
    this.setVersion('club');
    this.versionSelector()?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  t(text: { fr: string; en: string }): string {
    return this.langService.currentLang() === 'fr' ? text.fr : text.en;
  }

  openModalRoom(card: RoomCard) {
    this.booking.open({ categoryId: card.category.id, version: card.version });
  }
}

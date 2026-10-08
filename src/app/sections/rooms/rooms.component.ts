import { Component, computed, inject, signal } from '@angular/core';
import { Check, CigaretteOff, Crown, LucideAngularModule, Ruler, Users } from 'lucide-angular';
import { LangService } from '../../shared/lang.service';
import { BookingService } from '../../shared/booking.service';
import {
  CLUB_FLOORS, CLUB_PERKS, ROOM_CATEGORIES, RoomCategory, RoomOffer, RoomVersion,
  clubUpgradeDelta, formatPrice
} from '../../data/rooms.data';

interface RoomCard {
  category: RoomCategory;
  offer: RoomOffer;
  version: RoomVersion;
  // Classic mode, category only sold as Club (Penthouse)
  clubOnly: boolean;
  // Club mode, category without a Club version (Standard): shown greyed out
  unavailable: boolean;
  upgradeDelta: number | null;
}

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './rooms.component.html'
})
export class RoomsComponent {
  langService = inject(LangService);
  private booking = inject(BookingService);
  readonly icons = { Ruler, Users, CigaretteOff, Crown, Check };
  readonly clubPerks = CLUB_PERKS;
  readonly clubFloors = CLUB_FLOORS;
  readonly formatPrice = formatPrice;

  version = signal<RoomVersion>('classic');

  // Every category is shown in both modes: a category without an offer in the
  // selected version falls back to the one it has (Standard stays Classic in
  // Club mode, Penthouse stays Club in Classic mode)
  cards = computed<RoomCard[]>(() => {
    const mode = this.version();
    return ROOM_CATEGORIES
      .map(category => {
        const own = category.offers[mode];
        const version: RoomVersion = own ? mode : mode === 'club' ? 'classic' : 'club';
        return {
          category,
          offer: category.offers[version]!,
          version,
          clubOnly: mode === 'classic' && !own,
          unavailable: mode === 'club' && !own,
          upgradeDelta: clubUpgradeDelta(category),
        };
      });
  });

  setVersion(version: RoomVersion) {
    this.version.set(version);
  }

  t(text: { fr: string; en: string }): string {
    return this.langService.currentLang() === 'fr' ? text.fr : text.en;
  }

  openModalRoom(card: RoomCard) {
    this.booking.open({ categoryId: card.category.id, version: card.version });
  }
}

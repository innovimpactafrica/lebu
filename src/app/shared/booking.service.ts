import { Injectable, inject, signal } from '@angular/core';
import { PMS_ROOM_TYPE_IDS, RoomCategoryId, RoomVersion, findCategory } from '../data/rooms.data';
import { LangService } from './lang.service';

// RoomRaccoon booking engine (hotel PMS), one URL per language
const PMS_BOOKING_URL = 'https://booking.roomraccoon.com/lebu-appart-suites/';

// What a caller already knows when starting a booking
export interface BookingRequest {
  categoryId?: RoomCategoryId;
  version?: RoomVersion;
  checkIn?: string;
  checkOut?: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private langService = inject(LangService);

  // Booking modal state, unused while bookings go through the PMS
  readonly isOpen = signal(false);
  readonly request = signal<BookingRequest>({});

  // Every "Réserver" button lands on the RoomRaccoon booking engine, prefilled with what the
  // visitor already chose. Parameters are the ones RoomRaccoon's own booking widgets use.
  open(request: BookingRequest = {}) {
    window.open(this.bookingUrl(request), '_blank', 'noopener');
  }

  bookingUrl({ categoryId, version, checkIn, checkOut }: BookingRequest): string {
    const params = new URLSearchParams();
    // Dates as YYYY-MM-DD, the format of <input type="date">
    if (checkIn && checkOut && checkOut > checkIn) {
      params.set('dateStart', checkIn);
      params.set('dateEnd', checkOut);
    }
    const category = findCategory(categoryId);
    const offer = category && version ? category.offers[version] : undefined;
    params.set('roomTypes', (offer?.pmsRoomTypeId ? [offer.pmsRoomTypeId] : PMS_ROOM_TYPE_IDS).join(','));
    // Commas kept readable, as in the PMS links
    return `${PMS_BOOKING_URL}${this.langService.currentLang()}/?${params.toString().replace(/%2C/g, ',')}`;
  }

  close() {
    this.isOpen.set(false);
  }
}

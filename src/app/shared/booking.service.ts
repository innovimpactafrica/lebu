import { Injectable, inject, signal } from '@angular/core';
import { RoomCategoryId, RoomVersion } from '../data/rooms.data';
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

  // Every "Réserver" button lands on the RoomRaccoon booking engine.
  // The request is not forwarded: RoomRaccoon's deep-link parameters (dates, room type)
  // are not documented publicly, to be added once confirmed with them.
  open(_request: BookingRequest = {}) {
    window.open(`${PMS_BOOKING_URL}${this.langService.currentLang()}/`, '_blank', 'noopener');
  }

  close() {
    this.isOpen.set(false);
  }
}

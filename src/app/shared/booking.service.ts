import { Injectable, signal } from '@angular/core';
import { RoomCategoryId, RoomVersion } from '../data/rooms.data';

// What a caller already knows when opening the booking modal
export interface BookingRequest {
  categoryId?: RoomCategoryId;
  version?: RoomVersion;
  checkIn?: string;
  checkOut?: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  readonly isOpen = signal(false);
  readonly request = signal<BookingRequest>({});

  open(request: BookingRequest = {}) {
    // New object on every call so the modal re-applies the prefill even with identical values
    this.request.set({ ...request });
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }
}

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LangService } from '../../shared/lang.service';
import { BookingService } from '../../shared/booking.service';
import { addDays, todayISO } from '../../shared/date.utils';
import {
  CLUB_FLOORS, ROOM_CATEGORIES, RoomCategoryId, RoomVersion, formatPrice
} from '../../data/rooms.data';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booking.component.html'
})
export class BookingComponent {
  langService = inject(LangService);
  private booking = inject(BookingService);

  readonly today = todayISO();
  readonly clubFloors = CLUB_FLOORS;
  readonly formatPrice = formatPrice;
  readonly classicRooms = ROOM_CATEGORIES.filter(c => c.offers.classic);
  readonly clubRooms = ROOM_CATEGORIES.filter(c => c.offers.club);

  checkIn = this.today;
  checkOut = addDays(this.today, 1);
  // "<categoryId>:<version>", empty when the visitor has no preference
  room = '';

  onCheckInChange(value: string) {
    this.checkIn = value;
    if (value && this.checkOut <= value) this.checkOut = addDays(value, 1);
  }

  openBooking() {
    const [categoryId, version] = this.room ? this.room.split(':') as [RoomCategoryId, RoomVersion] : [];
    this.booking.open({ checkIn: this.checkIn, checkOut: this.checkOut, categoryId, version });
  }
}

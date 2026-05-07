import { Component, inject, OnInit } from '@angular/core';
import { LangService } from '../../shared/lang.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booking.component.html'
})
export class BookingComponent implements OnInit {
  langService = inject(LangService);

  checkIn = '';
  checkOut = '';
  room = '';

  ngOnInit() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    this.checkIn = today.toISOString().split('T')[0];
    this.checkOut = tomorrow.toISOString().split('T')[0];
  }

  openBooking() {
    document.dispatchEvent(new CustomEvent('openModal'));
  }
}

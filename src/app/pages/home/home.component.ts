import { Component } from '@angular/core';
import { HeroComponent } from '../../sections/hero/hero.component';
import { BookingComponent } from '../../sections/booking/booking.component';
import { AboutComponent } from '../../sections/about/about.component';
import { RoomsComponent } from '../../sections/rooms/rooms.component';
import { GalleryComponent } from '../../sections/gallery/gallery.component';
import { ConciergeComponent } from '../../sections/concierge/concierge.component';
import { ServicesComponent } from '../../sections/services/services.component';
import { RooftopComponent } from '../../sections/rooftop/rooftop.component';
import { SectionDividerComponent } from '../../shared/section-divider/section-divider.component';
// Lebu Fidélité: hidden for now
// import { LoyaltyComponent } from '../../sections/loyalty/loyalty.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    BookingComponent,
    AboutComponent,
    RoomsComponent,
    GalleryComponent,
    ConciergeComponent,
    ServicesComponent,
    RooftopComponent,
    SectionDividerComponent,
    // LoyaltyComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {}

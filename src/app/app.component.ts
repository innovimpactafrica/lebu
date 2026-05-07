import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './layout/header/header.component';
import { HeroComponent } from './sections/hero/hero.component';
import { BookingComponent } from './sections/booking/booking.component';
import { AboutComponent } from './sections/about/about.component';
import { RoomsComponent } from './sections/rooms/rooms.component';
import { GalleryComponent } from './sections/gallery/gallery.component';
import { ServicesComponent } from './sections/services/services.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ModalComponent } from './shared/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HeroComponent,
    BookingComponent,
    AboutComponent,
    RoomsComponent,
    GalleryComponent,
    ServicesComponent,
    FooterComponent,
    ModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lebu';
}

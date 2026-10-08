import { Component, inject } from '@angular/core';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';
import { LangService } from '../../shared/lang.service';
import { BookingService } from '../../shared/booking.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  langService = inject(LangService);
  booking = inject(BookingService);
  readonly icons = { ArrowRight };
}

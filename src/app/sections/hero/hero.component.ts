import { Component, inject } from '@angular/core';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';
import { LangService } from '../../shared/lang.service';
import { BookingService } from '../../shared/booking.service';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslocoPipe, LucideAngularModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  langService = inject(LangService);
  booking = inject(BookingService);
  readonly icons = { ArrowRight };
}

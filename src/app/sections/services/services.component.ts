import { Component, inject } from '@angular/core';
import { Coffee, Compass, Dumbbell, LucideAngularModule, Martini } from 'lucide-angular';
import { LangService } from '../../shared/lang.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  langService = inject(LangService);
  readonly icons = { Coffee, Martini, Dumbbell, Compass };
}

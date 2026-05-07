import { Component, inject } from '@angular/core';
import { LangService } from '../../shared/lang.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  langService = inject(LangService);
}

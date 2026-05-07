import { Component, inject } from '@angular/core';
import { LangService } from '../../shared/lang.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  langService = inject(LangService);
  
  stats = [
    { num: '34', labelFr: 'Appartements & Suites', labelEn: 'Apartments & Suites' },
    { num: '4', labelFr: 'Catégories de luxe', labelEn: 'Luxury categories' },
    { num: '5★', labelFr: 'Service hôtelier', labelEn: 'Hotel service' },
    { num: '24/7', labelFr: 'Assistance dédiée', labelEn: 'Dedicated assistance' }
  ];
}

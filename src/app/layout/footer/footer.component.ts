import { Component, inject } from '@angular/core';
import { LangService } from '../../shared/lang.service';
import { ROOM_CATEGORIES } from '../../data/rooms.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  langService = inject(LangService);
  readonly rooms = ROOM_CATEGORIES;
}

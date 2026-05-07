import { Component, inject } from '@angular/core';
import { LangService } from '../../shared/lang.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  langService = inject(LangService);
}

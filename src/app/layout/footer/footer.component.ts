import { Component, inject } from '@angular/core';
import { LangService } from '../../shared/lang.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  langService = inject(LangService);
}

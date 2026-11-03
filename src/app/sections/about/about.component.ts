import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, PenLine } from 'lucide-angular';
import { LangService } from '../../shared/lang.service';
import { ContentService } from '../../shared/content.service';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, RevealDirective],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  langService = inject(LangService);
  contentService = inject(ContentService);
  readonly icons = { PenLine };

  // Brochure section titles, one per editable paragraph
  readonly headings = [
    { fr: 'Notre Vision', en: 'Our Vision' },
    { fr: 'Héritage Lébou', en: 'Lébou Heritage' },
  ];

  // Brochure "Concept & Héritage" pillars
  readonly pillars = [
    {
      title: { fr: 'Service', en: 'Service' },
      text: { fr: 'Équipe dédiée 24h/24 autour d\'une hospitalité authentique.', en: 'A dedicated 24/7 team built around authentic hospitality.' },
    },
    {
      title: { fr: 'Culture', en: 'Culture' },
      text: { fr: 'Identité visuelle ancrée dans l\'art des pirogues de Yoff.', en: 'A visual identity rooted in the art of the Yoff pirogues.' },
    },
    {
      title: { fr: 'Confort', en: 'Comfort' },
      text: { fr: 'Appartements entièrement équipés, courts et longs séjours.', en: 'Fully equipped apartments for short and long stays.' },
    },
  ];

  editingIndex = signal<number | null>(null);
  tempFr = '';
  tempEn = '';

  stats = [
    { num: '36', labelFr: 'Suites', labelEn: 'Suites' },
    { num: '5', labelFr: 'Catégories de suites', labelEn: 'Suite categories' },
    { num: '24/7', labelFr: 'Assistance dédiée', labelEn: 'Dedicated assistance' }
  ];

  edit(index: number) {
    const p = this.contentService.content.paragraphs[index];
    this.tempFr = p?.fr ?? '';
    this.tempEn = p?.en ?? '';
    this.editingIndex.set(index);
  }

  async save(index: number) {
    await this.contentService.updateParagraph(index, this.tempFr, this.tempEn);
    this.editingIndex.set(null);
  }

  cancel() {
    this.editingIndex.set(null);
  }
}

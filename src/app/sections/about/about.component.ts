import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LangService } from '../../shared/lang.service';
import { ContentService } from '../../shared/content.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  langService = inject(LangService);
  contentService = inject(ContentService);

  editingIndex = signal<number | null>(null);
  tempFr = '';
  tempEn = '';

  stats = [
    { num: '34', labelFr: 'Appartements & Suites', labelEn: 'Apartments & Suites' },
    { num: '4', labelFr: 'Catégories de luxe', labelEn: 'Luxury categories' },
    { num: '5★', labelFr: 'Service hôtelier', labelEn: 'Hotel service' },
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

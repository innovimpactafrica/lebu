import { Component, ElementRef, inject, AfterViewInit, ViewChild, signal } from '@angular/core';
import { LangService } from '../../shared/lang.service';

interface Card {
  tier: string;
  tierClass: string;
  weaveId: string;
  number: string;
  perks: { fr: string; en: string }[];
}

@Component({
  selector: 'app-loyalty',
  standalone: true,
  templateUrl: './loyalty.component.html',
  styleUrl: './loyalty.component.css'
})
export class LoyaltyComponent implements AfterViewInit {
  langService = inject(LangService);

  cards: Card[] = [
    {
      tier: 'Bronze', tierClass: 'lcard--bronze', weaveId: 'weaveBronze', number: '0847 2213',
      perks: [
        { fr: 'Accès prioritaire à la réception', en: 'Priority check-in access' },
        { fr: 'Réduction de 5% sur les séjours', en: '5% discount on stays' },
        { fr: 'Petit-déjeuner offert 1×/séjour', en: 'Complimentary breakfast 1×/stay' },
        { fr: 'Accès au salon commun Club Lebu', en: 'Access to Club Lebu lounge' },
      ]
    },
    {
      tier: 'Argent', tierClass: 'lcard--argent', weaveId: 'weaveArgent', number: '1526 7749',
      perks: [
        { fr: 'Surclassement garanti sous réserve', en: 'Guaranteed upgrade (subject to availability)' },
        { fr: 'Réduction de 10% sur les séjours', en: '10% discount on stays' },
        { fr: 'Petit-déjeuner offert chaque matin', en: 'Daily complimentary breakfast' },
        { fr: 'Late check-out jusqu\'à 14h', en: 'Late check-out until 2 PM' },
        { fr: 'Accès spa — 1 soin offert/séjour', en: 'Spa access — 1 treatment/stay' },
      ]
    },
    {
      tier: 'Or', tierClass: 'lcard--or', weaveId: 'weaveOr', number: '0032 9981',
      perks: [
        { fr: 'Surclassement automatique Penthouse', en: 'Automatic Penthouse upgrade' },
        { fr: 'Réduction de 18% sur les séjours', en: '18% discount on stays' },
        { fr: 'Demi-pension incluse', en: 'Half-board included' },
        { fr: 'Transfert aéroport offert', en: 'Complimentary airport transfer' },
        { fr: 'Accès spa illimité + soins offerts', en: 'Unlimited spa access + treatments' },
        { fr: 'Conciergerie personnelle 24h/24', en: '24/7 personal concierge' },
      ]
    },
  ];

  active = signal(0);

  @ViewChild('cardEl') cardEl!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() { this.attachTilt(); }

  select(i: number) {
    this.active.set(i);
    setTimeout(() => this.attachTilt(), 0);
  }

  get current() { return this.cards[this.active()]; }

  private attachTilt() {
    const card = this.cardEl?.nativeElement;
    if (!card) return;
    card.onmousemove = (e: MouseEvent) => this.onMove(card, e.clientX, e.clientY);
    card.onmouseleave = () => this.onLeave(card);
    card.ontouchmove = (e: TouchEvent) => { if (e.touches[0]) this.onMove(card, e.touches[0].clientX, e.touches[0].clientY); };
    card.ontouchend = () => this.onLeave(card);
  }

  private onMove(card: HTMLElement, cx: number, cy: number) {
    const r = card.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (cx - r.left) / r.width));
    const py = Math.min(1, Math.max(0, (cy - r.top) / r.height));
    card.style.transform = `perspective(900px) rotateX(${((0.5 - py) * 11).toFixed(2)}deg) rotateY(${((px - 0.5) * 16).toFixed(2)}deg) scale3d(1.015,1.015,1.015)`;
    card.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
    card.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
    card.classList.add('is-active');
  }

  private onLeave(card: HTMLElement) {
    card.style.transform = '';
    card.classList.remove('is-active');
  }
}

import { Component, HostListener, computed, effect, inject, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArrowRight, Check, Crown, LucideAngularModule, Ruler, Sparkles, Users, X } from 'lucide-angular';
import { LangService } from '../lang.service';
import { BookingRequest, BookingService } from '../booking.service';
import { addDays, nightsBetween, todayISO } from '../date.utils';
import {
  CLUB_FLOORS, CLUB_PERKS, ROOM_CATEGORIES, RoomCategory, RoomCategoryId, RoomVersion,
  availableVersions, clubUpgradeDelta, findCategory, formatPrice, lowestPrice
} from '../../data/rooms.data';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  langService = inject(LangService);
  booking = inject(BookingService);
  readonly icons = { X, Check, Sparkles, ArrowRight, Crown, Ruler, Users };

  readonly categories = ROOM_CATEGORIES;
  readonly clubPerks = CLUB_PERKS;
  readonly clubFloors = CLUB_FLOORS;
  readonly formatPrice = formatPrice;
  readonly lowestPrice = lowestPrice;
  readonly availableVersions = availableVersions;
  readonly clubUpgradeDelta = clubUpgradeDelta;
  readonly today = todayISO();

  isSuccess = signal(false);
  formTouched = signal(false);

  categoryId = signal<RoomCategoryId | null>(null);
  version = signal<RoomVersion>('classic');
  checkIn = signal(this.today);
  checkOut = signal(addDays(this.today, 1));
  adults = signal(2);
  children = signal(0);

  fName = '';
  lName = '';
  email = '';
  phone = '';
  requests = '';

  category = computed(() => findCategory(this.categoryId()));
  offer = computed(() => this.category()?.offers[this.version()]);
  nights = computed(() => nightsBetween(this.checkIn(), this.checkOut()));
  total = computed(() => {
    const offer = this.offer();
    const nights = this.nights();
    return offer && nights > 0 ? offer.price * nights : null;
  });
  datesInvalid = computed(() => !this.checkIn() || !this.checkOut() || this.nights() < 1);
  adultOptions = computed(() => Array.from({ length: this.category()?.adults ?? 3 }, (_, i) => i + 1));

  constructor() {
    effect(() => {
      if (!this.booking.isOpen()) return;
      const request = this.booking.request();
      untracked(() => this.applyRequest(request));
    }, { allowSignalWrites: true });

    effect(() => {
      document.body.style.overflow = this.booking.isOpen() ? 'hidden' : '';
    });
  }

  private applyRequest(request: BookingRequest) {
    this.isSuccess.set(false);
    this.formTouched.set(false);

    const checkIn = request.checkIn && request.checkIn >= this.today ? request.checkIn : this.today;
    const checkOut = request.checkOut && request.checkOut > checkIn ? request.checkOut : addDays(checkIn, 1);
    this.checkIn.set(checkIn);
    this.checkOut.set(checkOut);

    // Without a preselected category, keep whatever the visitor picked last time
    if (request.categoryId) {
      this.selectCategory(request.categoryId, request.version);
    } else if (request.version) {
      this.selectVersion(request.version);
    }
  }

  selectCategory(id: RoomCategoryId, preferred?: RoomVersion) {
    const category = findCategory(id);
    if (!category) return;
    this.categoryId.set(id);

    const versions = availableVersions(category);
    const wanted = preferred ?? this.version();
    this.version.set(versions.includes(wanted) ? wanted : versions[0]);

    if (this.adults() > category.adults) this.adults.set(category.adults);
  }

  selectVersion(version: RoomVersion) {
    const category = this.category();
    if (category && !category.offers[version]) return;
    this.version.set(version);
  }

  onCheckInChange(value: string) {
    this.checkIn.set(value);
    if (value && this.checkOut() <= value) this.checkOut.set(addDays(value, 1));
  }

  isClubOnly(category: RoomCategory): boolean {
    return !category.offers.classic;
  }

  t(text: { fr: string; en: string }): string {
    return this.langService.currentLang() === 'fr' ? text.fr : text.en;
  }

  emailInvalid(): boolean {
    return !EMAIL_PATTERN.test(this.email.trim());
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.booking.isOpen()) this.closeModal();
  }

  closeModal() {
    this.booking.close();
    setTimeout(() => this.isSuccess.set(false), 400);
  }

  submitReservation(e: Event) {
    e.preventDefault();
    this.formTouched.set(true);

    if (!this.category() || !this.offer() || this.datesInvalid()
      || !this.fName.trim() || !this.lName.trim() || this.emailInvalid()) {
      return;
    }

    // TODO: send the reservation to the booking API once it is available
    this.isSuccess.set(true);
  }
}

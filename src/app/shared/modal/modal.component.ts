import { Component, HostListener, inject, signal, OnInit } from '@angular/core';
import { LangService } from '../lang.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
  langService = inject(LangService);
  
  isOpen = signal(false);
  isSuccess = signal(false);
  
  selectedRoom = signal('executive');
  
  checkIn = '';
  checkOut = '';
  fName = '';
  lName = '';
  email = '';
  phone = '';

  formTouched = false;

  rooms = [
    { id: 'executive', nameFr: 'Executive', nameEn: 'Executive', price: '90 000', group: 'floors' },
    { id: 'deluxe', nameFr: 'Deluxe', nameEn: 'Deluxe', price: '110 000', group: 'floors' },
    { id: 'premium-privilege', nameFr: 'Premium Privilege', nameEn: 'Premium Privilege', price: '130 000', group: 'club' },
    { id: 'club-executive', nameFr: 'Executive', nameEn: 'Executive', price: '150 000', group: 'club' },
    { id: 'club-deluxe', nameFr: 'Deluxe', nameEn: 'Deluxe', price: '180 000', group: 'club' },
    { id: 'penthouse', nameFr: 'Penthouse / Lebu Platinum', nameEn: 'Penthouse / Lebu Platinum', price: '220 000', group: 'club' },
  ];

  ngOnInit() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    this.checkIn = today.toISOString().split('T')[0];
    this.checkOut = tomorrow.toISOString().split('T')[0];
  }

  @HostListener('document:openModal')
  openModal() {
    this.isOpen.set(true);
    this.isSuccess.set(false);
    this.formTouched = false;
    document.body.style.overflow = 'hidden';
  }

  @HostListener('document:openModalRoom', ['$event'])
  openModalRoom(e: CustomEvent) {
    this.selectedRoom.set(e.detail);
    this.openModal();
  }

  closeModal() {
    this.isOpen.set(false);
    document.body.style.overflow = '';
    setTimeout(() => {
      this.isSuccess.set(false);
    }, 400);
  }

  selectRoom(id: string) {
    this.selectedRoom.set(id);
  }

  submitReservation(e: Event) {
    e.preventDefault();
    this.formTouched = true;

    if (!this.fName.trim() || !this.lName.trim() || !this.email.trim() || !this.checkIn || !this.checkOut) {
      return;
    }

    this.isSuccess.set(true);
  }
}

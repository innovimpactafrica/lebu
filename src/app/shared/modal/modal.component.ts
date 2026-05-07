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
  
  selectedRoom = signal('studio');
  
  checkIn = '';
  checkOut = '';
  fName = '';
  lName = '';
  email = '';
  phone = '';

  formTouched = false;

  rooms = [
    { id: 'studio', nameFr: 'Studio de Luxe', nameEn: 'Luxury Studio', price: '90 000' },
    { id: 'prestige', nameFr: 'Suite Prestige', nameEn: 'Prestige Suite', price: '110 000' },
    { id: 'executive', nameFr: 'Suite Exécutive', nameEn: 'Executive Suite', price: '180 000' },
    { id: 'penthouse', nameFr: 'Penthouse Exécutif', nameEn: 'Executive Penthouse', price: '220 000' }
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

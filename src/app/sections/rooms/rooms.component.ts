import { Component, inject } from '@angular/core';
import { LangService } from '../../shared/lang.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [],
  templateUrl: './rooms.component.html'
})
export class RoomsComponent {
  langService = inject(LangService);
  
  rooms = [
    {
      id: 'studio',
      image: 'kitchen.jpeg',
      bgClass: 'bg-[linear-gradient(135deg,#0a1e45_0%,#1a3a70_50%,#113068_100%)]',
      gradient: 'linear-gradient(135deg,#071527 0%,#132d5a 100%)',
      catFr: 'Entrée de gamme', catEn: 'Entry level',
      nameFr: 'Studio de Luxe', nameEn: 'Luxury Studio',
      price: '90 000',
      featuresFr: ['Kitchenette', 'Climatisation', 'Wi-Fi Haut Débit', 'TV 4K'],
      featuresEn: ['Kitchenette', 'Air conditioning', 'High-speed Wi-Fi', '4K TV'],
      btnFr: 'Réserver ce studio', btnEn: 'Book this studio'
    },
    {
      id: 'prestige',
      image: 'salon.jpeg',
      bgClass: 'bg-[linear-gradient(135deg,#0d1f3c_0%,#1e3460_100%)]',
      gradient: 'linear-gradient(135deg,#071527 0%,#0e2348 100%)',
      catFr: 'Élégance & Confort', catEn: 'Elegance & Comfort',
      nameFr: 'Suite Prestige', nameEn: 'Prestige Suite',
      price: '110 000',
      featuresFr: ['Salon séparé', 'Cuisine équipée', 'Baignoire'],
      featuresEn: ['Separate lounge', 'Fitted kitchen', 'Bathtub'],
      btnFr: 'Réserver cette suite', btnEn: 'Book this suite'
    },
    {
      id: 'executive',
      image: 'bedroom.jpeg',
      bgClass: 'bg-[linear-gradient(135deg,#0c1b35_0%,#162d58_100%)]',
      gradient: 'linear-gradient(135deg,#060f20 0%,#0b1e3e 100%)',
      catFr: 'Prestige & Raffinement', catEn: 'Prestige & Refinement',
      nameFr: 'Suite Exécutive', nameEn: 'Executive Suite',
      price: '180 000',
      featuresFr: ['Bureau privé', 'Vue panoramique', 'Jacuzzi'],
      featuresEn: ['Private office', 'Panoramic view', 'Jacuzzi'],
      btnFr: 'Réserver cette suite', btnEn: 'Book this suite'
    },
    {
      id: 'penthouse',
      image: 'toilet.jpeg',
      bgClass: 'bg-[linear-gradient(135deg,#080f1f_0%,#10234a_100%)]',
      gradient: 'linear-gradient(135deg,#04090f 0%,#081729 100%)',
      catFr: 'Summum du luxe', catEn: 'Ultimate luxury',
      nameFr: 'Penthouse Exécutif', nameEn: 'Executive Penthouse',
      price: '220 000',
      featuresFr: ['Terrasse privée', 'Service butler', 'Cuisine gastronomique'],
      featuresEn: ['Private terrace', 'Butler service', 'Gourmet kitchen'],
      btnFr: 'Réserver le penthouse', btnEn: 'Book the penthouse'
    }
  ];

  openModalRoom(type: string) {
    document.dispatchEvent(new CustomEvent('openModalRoom', { detail: type }));
  }
}

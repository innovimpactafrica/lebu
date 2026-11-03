// Single source of truth for room categories.
// Sources: "Catégories de chambres et privilèges Club Lebu" (prices in FCFA / night, taxes excluded)
// and the Lebu brochure (descriptions, shared amenities, Club Lebu privileges).
// To be replaced by the rooms API once it is available.

export type RoomVersion = 'classic' | 'club';

export type RoomCategoryId = 'standard' | 'deluxe' | 'executive' | 'prestige' | 'penthouse';

export interface Bilingual {
  fr: string;
  en: string;
}

export interface RoomOffer {
  price: number;
  // RoomRaccoon room type id, used to deep-link "Book this suite" to this exact offer
  pmsRoomTypeId?: number;
}

// Every RoomRaccoon room type of the hotel (from the PMS booking widget).
// TODO: set each offer's pmsRoomTypeId below once RoomRaccoon confirms which id is which;
// until then every booking link lists all of them.
export const PMS_ROOM_TYPE_IDS = [132226, 132227, 132228, 132225, 132229, 132222, 132223, 132224];

export interface RoomCategory {
  id: RoomCategoryId;
  name: string;
  // Optional marketing name shown under the category name (Penthouse Lebu Platinum)
  subtitle?: string;
  // Short description from the brochure
  description: Bilingual;
  image: string;
  // Spans the full grid width in the rooms section
  wide: boolean;
  surface: number;
  adults: number;
  features: Bilingual[];
  // Shared equipment, shown as a single line under the feature chips
  also: Bilingual;
  offers: Partial<Record<RoomVersion, RoomOffer>>;
}

const CORE_FEATURES: Bilingual[] = [
  { fr: 'Lit king ou lits jumeaux', en: 'King or twin beds' },
  { fr: 'Literie premium', en: 'Premium bedding' },
  { fr: 'Bureau', en: 'Desk' },
  { fr: 'Douche à l\'italienne', en: 'Walk-in shower' },
];

const KITCHENETTE: Bilingual = { fr: 'Kitchenette haut de gamme', en: 'High-end kitchenette' };
const PRIVATE_TERRACE: Bilingual = { fr: 'Terrasse privative', en: 'Private terrace' };

// Brochure: "Notre offre signature", used for both Executive and Prestige
const SIGNATURE_DESCRIPTION: Bilingual = {
  fr: 'Notre offre signature. Grand appartement aux accents culturels Lébou, œuvres d\'art locales, terrasse privative. Entre luxe contemporain et âme sénégalaise.',
  en: 'Our signature offer. A large apartment with Lébou cultural accents, local artworks and a private terrace. Between contemporary luxury and Senegalese soul.',
};

export interface Amenity {
  // File name of the brochure icon in public/icons/amenities
  icon: 'wifi' | 'tv' | 'air' | 'kitchen' | 'safe' | 'parking' | 'laundry' | 'concierge';
  label: Bilingual;
}

// Brochure: equipment shared by all 36 suites
export const SHARED_AMENITIES: Amenity[] = [
  { icon: 'wifi', label: { fr: 'Wi-Fi fibre', en: 'Fibre Wi-Fi' } },
  { icon: 'tv', label: { fr: 'Smart TV 4K', en: '4K Smart TV' } },
  { icon: 'air', label: { fr: 'Climatisation', en: 'Air conditioning' } },
  { icon: 'kitchen', label: { fr: 'Cuisine équipée', en: 'Equipped kitchen' } },
  { icon: 'safe', label: { fr: 'Coffre-fort', en: 'Safe' } },
  { icon: 'parking', label: { fr: 'Parking', en: 'Parking' } },
  { icon: 'laundry', label: { fr: 'Blanchisserie', en: 'Laundry' } },
  { icon: 'concierge', label: { fr: 'Conciergerie 24/7', en: '24/7 concierge' } },
];

const CORE_EQUIPMENT: Bilingual = {
  fr: 'TV, Wi-Fi, climatisation, minibar, coffre-fort, insonorisation renforcée',
  en: 'TV, Wi-Fi, air conditioning, minibar, safe, enhanced soundproofing',
};

export const CLUB_FLOORS: Bilingual = { fr: 'Étages 6 à 8', en: 'Floors 6 to 8' };

// Identical for every Club Lebu offer (brochure list)
export const CLUB_PERKS: Bilingual[] = [
  { fr: 'Check-in prioritaire', en: 'Priority check-in' },
  { fr: 'Peignoirs et chaussons', en: 'Bathrobes and slippers' },
  { fr: 'Machine Nespresso et sélection de thés', en: 'Nespresso machine and tea selection' },
  { fr: 'Service turndown', en: 'Turndown service' },
  { fr: 'Fruit de saison offert', en: 'Complimentary seasonal fruit' },
  { fr: 'Accès à l\'Executive Lounge', en: 'Executive Lounge access' },
  { fr: 'Conciergerie', en: 'Concierge' },
];

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    id: 'standard', name: 'Standard', image: 'kitchen.png', wide: true,
    description: {
      fr: 'Lit king ou lits jumeaux, literie premium, bureau et douche à l\'italienne : l\'essentiel du confort Lebu.',
      en: 'King or twin beds, premium bedding, desk and walk-in shower: the essence of Lebu comfort.',
    },
    surface: 16, adults: 2,
    features: [{ fr: 'Cuisine équipée', en: 'Equipped kitchen' }, ...CORE_FEATURES],
    also: CORE_EQUIPMENT,
    offers: { classic: { price: 85000 } },
  },
  {
    id: 'deluxe', name: 'Deluxe', image: 'salon.jpeg', wide: false,
    description: {
      fr: 'Cuisine équipée, chambre premium. Matériaux nobles, finitions soignées. Vue panoramique sur Dakar selon disponibilité.',
      en: 'Equipped kitchen, premium bedroom. Fine materials, careful finishes. Panoramic view of Dakar subject to availability.',
    },
    surface: 27, adults: 3,
    features: [KITCHENETTE, ...CORE_FEATURES],
    also: CORE_EQUIPMENT,
    offers: { classic: { price: 75000 }, club: { price: 85000 } },
  },
  {
    id: 'executive', name: 'Executive', image: 'bedroom.png', wide: false,
    description: SIGNATURE_DESCRIPTION,
    surface: 34, adults: 3,
    features: [PRIVATE_TERRACE, KITCHENETTE, ...CORE_FEATURES],
    also: CORE_EQUIPMENT,
    offers: { classic: { price: 85000 }, club: { price: 110000 } },
  },
  {
    id: 'prestige', name: 'Prestige', image: 'toilet.jpeg', wide: true,
    description: SIGNATURE_DESCRIPTION,
    surface: 55, adults: 3,
    features: [
      { fr: 'Chambre et salon', en: 'Bedroom and lounge' },
      PRIVATE_TERRACE,
      { fr: 'Lit king haut de gamme', en: 'High-end king bed' },
      { fr: 'Douche effet pluie', en: 'Rain shower' },
      { fr: 'Double vasque', en: 'Double vanity' },
      { fr: 'TV 55"', en: '55" TV' },
    ],
    also: { fr: 'Wi-Fi haut débit, service d\'étage, conciergerie', en: 'High-speed Wi-Fi, room service, concierge' },
    offers: { classic: { price: 100000 }, club: { price: 120000 } },
  },
  {
    // TODO: placeholder image until the Penthouse photos are available
    id: 'penthouse', name: 'Penthouse', subtitle: 'Lebu Platinum', image: 'building.jpeg', wide: true,
    description: {
      fr: 'Deux pièces avec salon séparé, vue panoramique sur l\'Atlantique et terrasse privative. Selon vos souhaits, nos hôtes personnalisent entièrement votre séjour.',
      en: 'Two rooms with a separate lounge, panoramic Atlantic view and private terrace. Our hosts can fully personalise your stay on request.',
    },
    surface: 122, adults: 3,
    features: [
      { fr: 'Deux pièces, salon séparé', en: 'Two rooms, separate lounge' },
      { fr: 'Vue panoramique sur l\'Atlantique', en: 'Panoramic Atlantic view' },
      { fr: 'Espace bureau', en: 'Office area' },
      { fr: 'Terrasse privative panoramique', en: 'Private panoramic terrace' },
      { fr: 'Douche effet pluie', en: 'Rain shower' },
      { fr: 'Double vasque', en: 'Double vanity' },
      { fr: 'TV 65"', en: '65" TV' },
    ],
    also: { fr: 'Service turndown, conciergerie', en: 'Turndown service, concierge' },
    offers: { club: { price: 400000 } },
  },
];

export function formatPrice(value: number): string {
  // Regular spaces, matching the "85 000" style used across the site
  return value.toLocaleString('fr-FR').replace(/\s/g, ' ');
}

export function hasClubVersion(category: RoomCategory): boolean {
  return !!category.offers.club;
}

export function availableVersions(category: RoomCategory): RoomVersion[] {
  return (['classic', 'club'] as const).filter(v => !!category.offers[v]);
}

export function lowestPrice(category: RoomCategory): number {
  return Math.min(...availableVersions(category).map(v => category.offers[v]!.price));
}

export function findCategory(id: RoomCategoryId | null | undefined): RoomCategory | undefined {
  return ROOM_CATEGORIES.find(c => c.id === id);
}

export function clubUpgradeDelta(category: RoomCategory): number | null {
  const { classic, club } = category.offers;
  return classic && club ? club.price - classic.price : null;
}

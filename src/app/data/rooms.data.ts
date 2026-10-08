// Single source of truth for room categories.
// Source: "Catégories de chambres et privilèges Club Lebu" (prices in FCFA / night, taxes excluded).
// To be replaced by the rooms API once it is available.

export type RoomVersion = 'classic' | 'club';

export type RoomCategoryId = 'standard' | 'deluxe' | 'executive' | 'prestige' | 'penthouse';

export interface Bilingual {
  fr: string;
  en: string;
}

export interface RoomOffer {
  price: number;
}

export interface RoomCategory {
  id: RoomCategoryId;
  name: string;
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

const CORE_EQUIPMENT: Bilingual = {
  fr: 'TV, Wi-Fi, climatisation, minibar, coffre-fort, insonorisation renforcée',
  en: 'TV, Wi-Fi, air conditioning, minibar, safe, enhanced soundproofing',
};

export const CLUB_FLOORS: Bilingual = { fr: 'Étages 6 à 8', en: 'Floors 6 to 8' };

// Identical for every Club Lebu offer
export const CLUB_PERKS: Bilingual[] = [
  { fr: 'Check-in prioritaire', en: 'Priority check-in' },
  { fr: 'Peignoirs', en: 'Bathrobes' },
  { fr: 'Chaussons', en: 'Slippers' },
  { fr: 'Machine Nespresso', en: 'Nespresso machine' },
  { fr: 'Sélection de thés', en: 'Tea selection' },
  { fr: 'Service turndown', en: 'Turndown service' },
  { fr: 'Une pièce de blanchisserie offerte', en: 'One complimentary laundry item' },
  { fr: 'Fruits de saison', en: 'Seasonal fruit' },
];

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    id: 'standard', name: 'Standard', image: 'kitchen.png', wide: true,
    surface: 16, adults: 2,
    features: CORE_FEATURES,
    also: CORE_EQUIPMENT,
    offers: { classic: { price: 85000 } },
  },
  {
    id: 'deluxe', name: 'Deluxe', image: 'salon.jpeg', wide: false,
    surface: 27, adults: 3,
    features: [KITCHENETTE, ...CORE_FEATURES],
    also: CORE_EQUIPMENT,
    offers: { classic: { price: 75000 }, club: { price: 85000 } },
  },
  {
    id: 'executive', name: 'Executive', image: 'bedroom.png', wide: false,
    surface: 34, adults: 3,
    features: [KITCHENETTE, ...CORE_FEATURES],
    also: CORE_EQUIPMENT,
    offers: { classic: { price: 85000 }, club: { price: 110000 } },
  },
  {
    id: 'prestige', name: 'Prestige', image: 'toilet.jpeg', wide: true,
    surface: 55, adults: 3,
    features: [
      { fr: 'Chambre et salon', en: 'Bedroom and lounge' },
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
    id: 'penthouse', name: 'Penthouse', image: 'building.jpeg', wide: true,
    surface: 122, adults: 3,
    features: [
      { fr: 'Grand salon', en: 'Large lounge' },
      { fr: 'Espace bureau', en: 'Office area' },
      { fr: 'Terrasse privée panoramique', en: 'Private panoramic terrace' },
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

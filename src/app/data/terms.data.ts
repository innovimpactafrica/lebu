// Conditions générales de vente, source: Lebu brochure (CGV version 1.2, October 2026).
// The French text is the reference; the English version is provided for convenience.

import { Bilingual } from './rooms.data';

export interface TermsItem {
  label: Bilingual;
  text: Bilingual;
}

export interface TermsArticle {
  number: number;
  title: Bilingual;
  paragraphs: Bilingual[];
  items?: TermsItem[];
}

// Key figures shown above the full text, each linked to its article
export interface TermsEssential {
  value: Bilingual;
  label: Bilingual;
  detail: Bilingual;
  article: number;
}

export const TERMS_VERSION: Bilingual = { fr: 'Version 1.2 — Octobre 2026', en: 'Version 1.2 — October 2026' };

export const TERMS_ESSENTIALS: TermsEssential[] = [
  {
    value: { fr: '14 h', en: '2 PM' },
    label: { fr: 'Arrivée', en: 'Check-in' },
    detail: { fr: 'Suites disponibles dès 14 h', en: 'Suites available from 2 PM' },
    article: 6,
  },
  {
    value: { fr: '12 h', en: '12 PM' },
    label: { fr: 'Départ', en: 'Check-out' },
    detail: { fr: 'Suites libérées avant midi', en: 'Suites vacated by noon' },
    article: 6,
  },
  {
    value: { fr: '48 h', en: '48 h' },
    label: { fr: 'Annulation offerte', en: 'Free cancellation' },
    detail: { fr: 'Jusqu\'à 48 h avant l\'arrivée', en: 'Up to 48 hours before arrival' },
    article: 5,
  },
  {
    value: { fr: '1 nuit', en: '1 night' },
    label: { fr: 'Acompte', en: 'Deposit' },
    detail: { fr: 'À la réservation, solde à l\'arrivée', en: 'At booking, balance on arrival' },
    article: 4,
  },
  {
    value: { fr: '15 j', en: '15 days' },
    label: { fr: 'Remboursement', en: 'Refunds' },
    detail: { fr: 'Dépôts et sommes dues restitués', en: 'Deposits and sums due returned' },
    article: 10,
  },
];

export const TERMS_ARTICLES: TermsArticle[] = [
  {
    number: 1,
    title: { fr: 'Objet et acceptation', en: 'Purpose and acceptance' },
    paragraphs: [
      {
        fr: 'Les présentes CGV régissent les ventes de LEBU Appart & Suites, apart-hôtel 4 étoiles exploité par la SCI Le Sandial, Complexe Neptune, 22 rue Wagane Diouf, Plateau, Dakar, ci-après « l\'Établissement » : hébergement en suites, petit-déjeuner, restauration, Bar & Lounge sans alcool, accès fitness, offres Club LEBU, réunions, évènements, privatisations et forfaits.',
        en: 'These terms govern the sales of LEBU Appart & Suites, a 4-star apart-hotel operated by SCI Le Sandial, Complexe Neptune, 22 rue Wagane Diouf, Plateau, Dakar, hereinafter "the Establishment": suite accommodation, breakfast, dining, alcohol-free Bar & Lounge, fitness access, Club LEBU offers, meetings, events, private hire and packages.',
      },
      {
        fr: 'Seules les prestations commandées sont incluses. Le Client reçoit et accepte les CGV avant son engagement. Les conditions particulières acceptées prévalent, sous réserve des règles impératives.',
        en: 'Only the services ordered are included. The Client receives and accepts these terms before committing. Any accepted specific conditions prevail, subject to mandatory rules.',
      },
    ],
  },
  {
    number: 2,
    title: { fr: 'Réservation et représentation', en: 'Booking and representation' },
    paragraphs: [
      {
        fr: 'Il convient de distinguer les réservations planifiées à l\'avance (individuelles ou de groupes), qui nécessitent une confirmation et une garantie, des prestations sollicitées sur place de manière ponctuelle (sans réservation préalable), qui sont soumises à la disponibilité immédiate.',
        en: 'Bookings planned in advance (individual or group), which require confirmation and a guarantee, are distinct from services requested on site on an ad hoc basis (without prior booking), which are subject to immediate availability.',
      },
      {
        fr: 'Le devis est valable trente jours, sauf indication contraire, sans blocage de disponibilité hors option écrite. La réservation devient ferme après confirmation de l\'Établissement et réception de l\'acompte ou de la garantie convenus.',
        en: 'Quotes are valid for thirty days unless stated otherwise, without holding availability unless a written option is granted. A booking becomes firm once confirmed by the Establishment and the agreed deposit or guarantee has been received.',
      },
      {
        fr: 'Le Client précise les effectifs, dates, besoins particuliers, coordonnées de facturation et personnes habilitées à engager des dépenses. Une entreprise ne prend en charge les extras de ses bénéficiaires que dans les limites expressément acceptées.',
        en: 'The Client specifies the number of guests, dates, special requirements, billing details and the persons authorised to incur expenses. A company only covers its beneficiaries\' extras within the limits it has expressly accepted.',
      },
    ],
  },
  {
    number: 3,
    title: { fr: 'Prix et taxes', en: 'Prices and taxes' },
    paragraphs: [
      {
        fr: 'Les prix sont exprimés en FCFA (XOF). Les prix hors taxes sont majorés de la TVA au taux légal applicable à chaque prestation et, pour l\'hébergement, de la taxe de séjour ou de promotion touristique légalement applicable.',
        en: 'Prices are expressed in FCFA (XOF). Prices excluding tax are subject to VAT at the legal rate applicable to each service and, for accommodation, to the applicable tourist or tourism promotion tax.',
      },
      {
        fr: 'Le devis et la facture distinguent le prix HT, les taxes et le total TTC ; aucune taxe déjà comprise dans un prix TTC n\'est ajoutée une seconde fois. Toute exonération exige un justificatif valable. Les suppléments et extras sont annoncés et acceptés avant facturation définitive.',
        en: 'Quotes and invoices show the price excluding tax, the taxes and the total including tax; no tax already included in a tax-inclusive price is added twice. Any exemption requires valid proof. Supplements and extras are announced and accepted before final invoicing.',
      },
    ],
  },
  {
    number: 4,
    title: { fr: 'Paiement et garanties', en: 'Payment and guarantees' },
    paragraphs: [
      { fr: 'Sauf conditions particulières écrites :', en: 'Unless otherwise agreed in writing:' },
    ],
    items: [
      {
        label: { fr: 'Hébergement individuel', en: 'Individual stays' },
        text: { fr: 'acompte de la première nuitée à la réservation, solde à l\'arrivée.', en: 'first-night deposit at booking, balance on arrival.' },
      },
      {
        label: { fr: 'Groupes (≥ 10 suites), banquets, réunions et privatisations', en: 'Groups (10+ suites), banquets, meetings and private hire' },
        text: { fr: 'acompte de 50 % à la commande, solde au check-in.', en: '50% deposit on order, balance at check-in.' },
      },
      {
        label: { fr: 'Forfaits et offres prépayées', en: 'Packages and prepaid offers' },
        text: { fr: 'paiement intégral exigé à l\'achat ou lors de la confirmation.', en: 'full payment required at purchase or on confirmation.' },
      },
      {
        label: { fr: 'Prestations sur place (sans réservation)', en: 'On-site services (without booking)' },
        text: { fr: 'la restauration courante, le Bar & Lounge et les extras se règlent en fin de service ou au départ.', en: 'everyday dining, the Bar & Lounge and extras are settled at the end of service or on departure.' },
      },
      {
        label: { fr: 'Crédit et impayés', en: 'Credit and unpaid sums' },
        text: {
          fr: 'tout crédit exige un accord écrit. Après mise en demeure restée infructueuse, les prestations futures peuvent être suspendues et des pénalités de retard s\'appliquent de plein droit (au taux légal en vigueur ou taux conventionnel), majorées pour les professionnels d\'une indemnité de recouvrement.',
          en: 'any credit requires written agreement. After an unanswered formal notice, future services may be suspended and late-payment penalties apply automatically (at the legal or agreed rate), plus a recovery fee for business clients.',
        },
      },
      {
        label: { fr: 'Dépôts de garantie', en: 'Security deposits' },
        text: {
          fr: 'tout dépôt exigé est annoncé préalablement ; les retenues pour dommage sont strictement justifiées et le solde est restitué sous 15 jours après vérification.',
          en: 'any deposit required is announced in advance; deductions for damage are strictly justified and the balance is returned within 15 days after inspection.',
        },
      },
    ],
  },
  {
    number: 5,
    title: { fr: 'Modification, annulation et absence', en: 'Changes, cancellation and no-show' },
    paragraphs: [
      {
        fr: 'Le présent article s\'applique exclusivement aux prestations ayant fait l\'objet d\'une réservation préalable. Les prestations achetées sur place de manière ponctuelle sont fermes et définitives. Toute modification ou annulation doit être notifiée par écrit. Sauf conditions particulières, les règles suivantes s\'appliquent :',
        en: 'This article applies only to services booked in advance. Services purchased on site on an ad hoc basis are firm and final. Any change or cancellation must be notified in writing. Unless otherwise agreed, the following rules apply:',
      },
    ],
    items: [
      {
        label: { fr: 'Hébergement individuel', en: 'Individual stays' },
        text: {
          fr: 'annulation sans frais jusqu\'à 48 h avant l\'arrivée ; en cas d\'annulation tardive ou de non-présentation (no-show), la première nuitée est due.',
          en: 'free cancellation up to 48 hours before arrival; for late cancellation or no-show, the first night is due.',
        },
      },
      {
        label: { fr: 'Hébergement en groupe (dès 10 suites)', en: 'Group stays (10+ suites)' },
        text: {
          fr: 'annulation sans frais jusqu\'à 7 jours avant ; passé ce délai, l\'acompte est conservé à titre d\'indemnité.',
          en: 'free cancellation up to 7 days before; after that, the deposit is retained as compensation.',
        },
      },
      {
        label: { fr: 'Évènements, banquets, réunions et privatisations', en: 'Events, banquets, meetings and private hire' },
        text: {
          fr: 'annulation sans frais jusqu\'à 7 jours avant ; à moins de 7 jours, l\'acompte de 50 % est conservé, et à moins de 3 jours, la totalité de la prestation est due.',
          en: 'free cancellation up to 7 days before; within 7 days the 50% deposit is retained, and within 3 days the full amount is due.',
        },
      },
    ],
  },
  {
    number: 6,
    title: { fr: 'Hébergement', en: 'Accommodation' },
    paragraphs: [
      {
        fr: 'Les suites sont disponibles à partir de 14 h et doivent être libérées au plus tard à 12 h.',
        en: 'Suites are available from 2 PM and must be vacated by 12 PM at the latest.',
      },
    ],
    items: [
      {
        label: { fr: 'Départs tardifs', en: 'Late check-out' },
        text: {
          fr: 'si la suite est occupée au-delà de 12 h et jusqu\'à 18 h, un supplément forfaitaire de 30 000 FCFA est facturé, sauf accord contraire de la direction. Au-delà de 18 h, l\'intégralité de la nuitée est facturée.',
          en: 'if the suite is occupied after 12 PM and until 6 PM, a flat supplement of 30,000 FCFA is charged, unless otherwise agreed by management. After 6 PM, the full night is charged.',
        },
      },
      {
        label: { fr: 'Arrivées anticipées', en: 'Early arrival' },
        text: {
          fr: 'en cas d\'arrivée matinale, un préenregistrement est requis et 50 % du montant de la nuitée précédente est facturé, sauf exception accordée par la direction. Tout autre aménagement d\'horaire ou prolongation de séjour nécessite un accord préalable.',
          en: 'for an early-morning arrival, pre-registration is required and 50% of the previous night\'s rate is charged, unless management grants an exception. Any other schedule adjustment or extension requires prior agreement.',
        },
      },
      {
        label: { fr: 'Dispositions générales', en: 'General provisions' },
        text: {
          fr: 'les occupants présentent les documents requis, respectent les capacités d\'accueil des suites ainsi que les règles de visite et de tranquillité de la résidence. Toute arrivée tardive de nuit est signalée. Un départ anticipé en cours de séjour respecte un préavis de 24 h (indemnité plafonnée à une nuitée par suite pour les individuels ; barème spécifique pour les groupes).',
          en: 'occupants present the required documents and respect suite capacities as well as the residence\'s visiting and quiet rules. Late-night arrivals must be announced. Leaving early during a stay requires 24 hours\' notice (compensation capped at one night per suite for individuals; specific scale for groups).',
        },
      },
    ],
  },
  {
    number: 7,
    title: { fr: 'Restauration et traiteur', en: 'Dining and catering' },
    paragraphs: [
      {
        fr: 'Le présent article s\'applique exclusivement aux prestations de restauration et de traiteur ayant fait l\'objet d\'une commande ou d\'une réservation préalable. Les menus, boissons, horaires et effectifs globaux sont convenus à la commande.',
        en: 'This article applies only to dining and catering services ordered or booked in advance. Menus, drinks, times and overall guest numbers are agreed when ordering.',
      },
      {
        fr: 'Les choix définitifs (sélection des plats, régimes spéciaux et signalement des allergies) sont confirmés au plus tard 5 jours avant le service, afin de permettre l\'approvisionnement des produits.',
        en: 'Final choices (dishes, special diets and allergies) are confirmed no later than 5 days before the service, so that produce can be sourced.',
      },
    ],
    items: [
      {
        label: { fr: 'Ajustements et effectifs', en: 'Adjustments and numbers' },
        text: {
          fr: 'toute réduction d\'effectif est encadrée exclusivement par les délais et pénalités de l\'article 5 (aucune réduction sans frais n\'est admise dans ce délai de 5 jours). L\'accueil de convives supplémentaires de dernière minute reste possible selon les capacités et est facturé en sus.',
          en: 'any reduction in numbers is governed solely by the deadlines and penalties of article 5 (no free reduction is accepted within this 5-day period). Last-minute additional guests can be welcomed depending on capacity and are charged extra.',
        },
      },
      {
        label: { fr: 'Sécurité et logistique', en: 'Safety and logistics' },
        text: {
          fr: 'les apports extérieurs de nourriture ou de boissons sont interdits sauf accord écrit préalable ; aucune boisson alcoolisée n\'est admise, y compris lors des évènements et privatisations. Pour toute prestation hors site, les conditions de livraison, d\'accès, d\'installation, de chaîne du froid et de restitution du matériel sont définies au devis.',
          en: 'outside food or drinks are not permitted without prior written agreement; no alcoholic beverages are allowed, including at events and private hire. For off-site services, delivery, access, set-up, cold-chain and equipment return conditions are defined in the quote.',
        },
      },
    ],
  },
  {
    number: 8,
    title: { fr: 'Fitness, Bar & Lounge et espaces communs', en: 'Fitness, Bar & Lounge and shared spaces' },
    paragraphs: [
      {
        fr: 'L\'accès à la salle de fitness, au Bar & Lounge et aux espaces du Club LEBU est limité aux horaires affichés, aux capacités et aux conditions de l\'offre souscrite. Les consignes de sécurité et d\'usage des équipements sont communiquées sur place et doivent être respectées.',
        en: 'Access to the fitness room, the Bar & Lounge and Club LEBU spaces is limited to the posted hours, capacities and the conditions of the chosen offer. Safety and equipment instructions are given on site and must be followed.',
      },
      {
        fr: 'Les mineurs restent sous la surveillance de leur accompagnant. Les comportements dangereux ou contraires à la tranquillité de la résidence peuvent entraîner une interruption ou une exclusion proportionnée.',
        en: 'Minors remain under the supervision of the adult accompanying them. Dangerous behaviour or behaviour that disturbs the peace of the residence may lead to a proportionate interruption or exclusion.',
      },
    ],
    items: [
      {
        label: { fr: 'Établissement sans alcool', en: 'Alcohol-free establishment' },
        text: {
          fr: 'aucune boisson alcoolisée n\'est servie à LEBU Appart & Suites, et la consommation d\'alcool est interdite dans les espaces communs (restaurant, Bar & Lounge, Club LEBU, fitness, salles de réunion et d\'évènements).',
          en: 'no alcoholic beverages are served at LEBU Appart & Suites, and drinking alcohol is not permitted in shared spaces (restaurant, Bar & Lounge, Club LEBU, fitness, meeting and event rooms).',
        },
      },
      {
        label: { fr: 'Établissement non-fumeur', en: 'Non-smoking establishment' },
        text: {
          fr: 'il est interdit de fumer ou de vapoter dans l\'ensemble de l\'Établissement, suites, balcons et espaces communs compris. Tout manquement entraîne la facturation des frais de nettoyage et de remise en état sur justificatifs.',
          en: 'smoking and vaping are not permitted anywhere in the Establishment, including suites, balconies and shared spaces. Any breach results in cleaning and restoration costs being charged on presentation of proof.',
        },
      },
    ],
  },
  {
    number: 9,
    title: { fr: 'Réunions, évènements et privatisations', en: 'Meetings, events and private hire' },
    paragraphs: [
      {
        fr: 'Le devis définit les espaces, capacités, horaires, prestations incluses et responsabilités de l\'Organisateur. Tout dépassement nécessite un accord et est facturé au tarif annoncé.',
        en: 'The quote defines the spaces, capacities, times, included services and the Organiser\'s responsibilities. Any overrun requires agreement and is charged at the announced rate.',
      },
      {
        fr: 'L\'Organisateur déclare l\'évènement et ses intervenants et obtient les autorisations relevant de son rôle. Les prestataires extérieurs, installations, décors et captations commerciales sont soumis à l\'autorisation préalable de l\'Établissement.',
        en: 'The Organiser declares the event and its speakers and obtains the authorisations within its remit. External suppliers, installations, decorations and commercial filming require the Establishment\'s prior approval.',
      },
    ],
  },
  {
    number: 10,
    title: { fr: 'Indisponibilité et force majeure', en: 'Unavailability and force majeure' },
    paragraphs: [
      {
        fr: 'En cas d\'indisponibilité, l\'Établissement propose, avec l\'accord du Client, une prestation équivalente ou un report. À défaut d\'accord, les sommes versées pour les prestations non fournies sont remboursées sous quinze jours, sauf si le Client accepte un avoir, sans préjudice de ses recours légaux.',
        en: 'If a service is unavailable, the Establishment offers, with the Client\'s agreement, an equivalent service or a postponement. Failing agreement, sums paid for services not provided are refunded within fifteen days, unless the Client accepts a credit note, without prejudice to their legal remedies.',
      },
      {
        fr: 'La force majeure légalement caractérisée suspend les obligations concernées ou entraîne leur résolution lorsque la prestation perd son utilité.',
        en: 'Legally established force majeure suspends the obligations concerned, or terminates them where the service loses its purpose.',
      },
    ],
  },
  {
    number: 11,
    title: { fr: 'Responsabilité et biens personnels', en: 'Liability and personal belongings' },
    paragraphs: [
      {
        fr: 'Chaque partie répond des dommages qui lui sont légalement imputables. Les dégradations et pertes de matériel, mobilier ou équipements des suites sont facturées sur justificatifs, hors usure normale et sans double indemnisation.',
        en: 'Each party is liable for damage legally attributable to it. Damage to or loss of suite equipment, furniture or fittings is charged on presentation of proof, excluding normal wear and without double compensation.',
      },
      {
        fr: 'Les présentes conditions ne limitent ni les obligations légales de sécurité et de responsabilité de l\'Établissement, ni les droits impératifs du Client.',
        en: 'These terms limit neither the Establishment\'s legal safety and liability obligations nor the Client\'s mandatory rights.',
      },
    ],
  },
  {
    number: 12,
    title: { fr: 'Réclamations et droit applicable', en: 'Complaints and governing law' },
    paragraphs: [
      {
        fr: 'Les réclamations écrites sont adressées au contact indiqué sur le devis ou la facture. Le contrat est régi par le droit sénégalais et les textes OHADA applicables ; les litiges relèvent des juridictions légalement compétentes.',
        en: 'Written complaints are sent to the contact shown on the quote or invoice. The contract is governed by Senegalese law and the applicable OHADA texts; disputes fall under the legally competent courts.',
      },
    ],
  },
];

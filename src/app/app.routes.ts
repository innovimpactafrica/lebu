import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Lebu Appart&Suites' },
  {
    path: 'conditions-generales',
    loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent),
    title: 'Conditions générales de vente · Lebu Appart&Suites',
  },
  {
    path: 'conciergerie',
    loadComponent: () => import('./pages/concierge/concierge-page.component').then(m => m.ConciergePageComponent),
    title: 'Conciergerie · Lebu Appart&Suites',
  },
  {
    path: 'conciergerie/:rubric',
    loadComponent: () => import('./pages/concierge/concierge-page.component').then(m => m.ConciergePageComponent),
    title: 'Conciergerie · Lebu Appart&Suites',
  },
  { path: '**', redirectTo: '' },
];

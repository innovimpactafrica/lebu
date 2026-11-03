import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Lebu Appart&Suites' },
  {
    path: 'conditions-generales',
    loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent),
    title: 'Conditions générales de vente · Lebu Appart&Suites',
  },
  { path: '**', redirectTo: '' },
];

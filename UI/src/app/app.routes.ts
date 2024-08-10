import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(
        (m) => m.AboutComponent
      ),
  },
  {
    path: 'about/faq',
    loadComponent: () =>
      import('./components/about/faq/faq.component').then(
        (m) => m.FaqComponent
      ),
  },
  {
    path: 'about/contact',
    loadComponent: () =>
      import('./components/about/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
  },
  {
    path: 'about/attributions',
    loadComponent: () =>
      import('./components/about/attributions/attributions.component').then(
        (m) => m.AttributionsComponent
      ),
  },
  { path: '**', redirectTo: '/' },
];

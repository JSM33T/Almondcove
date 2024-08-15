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
  {
    path: 'artifacts',
    loadComponent: () =>
      import('./components/artifacts/artifacts.component').then(
        (m) => m.ArtifactsComponent
      ),
  },
  {
    path: 'artifact/:year/:slug',
    loadComponent: () =>
      import('./components/artifacts/view/view.component').then(
        (m) => m.ViewComponent
      ),
  },
  { path: '**', redirectTo: '/' },
];

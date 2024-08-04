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
  { path: '**', redirectTo: '/' },
];

import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
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
    path: 'blogs',
    loadComponent: () =>
      import('./components/blogs/blog.component').then(
        (m) => m.BlogComponent
      ),
  },
  {
    path: 'blog/:year/:slug',
    loadComponent: () =>
      import('./components/blogs/view/view.component').then(
        (m) => m.ViewComponent
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
    path: 'artifact/:type/:slug',
    loadComponent: () =>
      import('./components/artifacts/view/view.component').then(
        (m) => m.ViewComponent
      ),
  },

  {
    path: 'studio',
    loadComponent: () =>
      import('./components/studio/studio.component').then(
        (m) => m.StudioComponent
      ),
  },
  {
    path: 'studio/:slug',
    loadComponent: () =>
      import('./components/studio/view/view.component').then(
        (m) => m.ViewComponent
      ),
  },

  { path: '**', redirectTo: '/' },
];

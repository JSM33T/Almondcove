// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
// };
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { HttpClient } from '@angular/common/http';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client'
import {LoadingBarRouterModule} from '@ngx-loading-bar/router'

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(LoadingBarHttpClientModule,LoadingBarRouterModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// interface MetaTags {
//   title: string;
//   description: string;
//   keywords: string;
//   'og:title': string;
//   'og:description': string;
//   'og:image': string;
//   'og:url': string;
//   'twitter:card': string;
//   'twitter:title': string;
//   'twitter:description': string;
//   'twitter:image': string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class MetaTagsService {
//   public metaTagsUrl = 'assets/data/meta-tags.json'; 

//   constructor(private http: HttpClient) {}

//   getMetaTags(route: string): Observable<MetaTags> {
//     return this.http.get<{ [key: string]: MetaTags }>(this.metaTagsUrl).pipe(
//       map(tags => tags[route])
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface MetaTags {
  title: string;
  description: string;
  keywords: string;
  'og:title': string;
  'og:description': string;
  'og:image': string;
  'og:url': string;
  'twitter:card': string;
  'twitter:title': string;
  'twitter:description': string;
  'twitter:image': string;
}

@Injectable({
  providedIn: 'root'
})
export class MetaTagsService {

  constructor(private http: HttpClient) {}

  getMetaTags(route: string): Observable<MetaTags> {
    const metaTagsUrl = `assets/data/meta/${route}.json`; // Dynamically construct the file path
    console.log(route);
    return this.http.get<MetaTags>(metaTagsUrl);
  }
}


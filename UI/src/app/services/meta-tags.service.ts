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
    const metaTagsUrl = `assets/data/meta/${route}.json`;
    //console.log(route);
    return this.http.get<MetaTags>(metaTagsUrl);
  }
}


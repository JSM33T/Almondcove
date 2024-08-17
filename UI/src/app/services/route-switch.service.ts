import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { MetaTagsService } from './meta-tags.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouteSwitchService {
  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    private metaTagsService: MetaTagsService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        window.scrollTo(0, 0);
        // window.scrollTo({
        //   top: 0,
        //   behavior: 'smooth',
        // });
        const route = event.urlAfterRedirects.split('/').pop() || 'home';

        if (event.urlAfterRedirects.startsWith('/artifact')) {
          //skipping cz dynamic artifact tags
          return;
        }

        this.metaTagsService.getMetaTags(route).subscribe((metaTags) => {
          if (metaTags) {
            this.setTitleAndMetaTags(metaTags);
          }
        });
      });
  }

  private setTitleAndMetaTags(metaTags: any): void {
    this.titleService.setTitle(metaTags.title);
    this.metaService.addTags([
      { name: 'description', content: metaTags.description },
      { name: 'keywords', content: metaTags.keywords },
      { property: 'og:title', content: metaTags['og:title'] },
      { property: 'og:description', content: metaTags['og:description'] },
      { property: 'og:image', content: metaTags['og:image'] },
      { property: 'og:url', content: metaTags['og:url'] },
      { name: 'twitter:card', content: metaTags['twitter:card'] },
      { name: 'twitter:title', content: metaTags['twitter:title'] },
      { name: 'twitter:description', content: metaTags['twitter:description'] },
      { name: 'twitter:image', content: metaTags['twitter:image'] },
    ]);
  }
}

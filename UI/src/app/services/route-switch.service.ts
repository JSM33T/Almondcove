import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { cleanAOS } from '../library/invokers/animate-on-scroll';
import { MetaTagManagerService } from './metaservice.service';

@Injectable({
	providedIn: 'root',
})
export class RouteSwitchService {
	constructor(
		private router: Router,
		private titleService: Title,
		private activatedRoute: ActivatedRoute,
		private metaService: Meta,
    private metaTagManagerService: MetaTagManagerService
	) {
		this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
			//window.scrollTo(0, 0);
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});

      this.metaTagManagerService.initializeMetaTags();
		});
	}
}

import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RouteSwitchService } from './services/route-switch.service';
import { initBackToTop } from './library/invokers/back-to-top';
import { SidePanelComponent } from './components/shared/side-panel/side-panel.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { BackToTopComponent } from './components/shared/back-to-top/back-to-top.component';
// import { inject } from '@vercel/analytics';
// import { injectSpeedInsights } from '@vercel/speed-insights';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import setTheme from './library/invokers/settheme';
import { LoaderComponent } from "./components/shared/loader/loader.component";
import { MetaTagManagerService } from './services/metaservice.service';
@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
    RouterModule,
    RouterOutlet,
    BackToTopComponent,
    FooterComponent,
    NavbarComponent,
    SidePanelComponent,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    LoaderComponent
],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
	constructor(private routeMetaService: RouteSwitchService,private metaTagManagerService: MetaTagManagerService) {}

	ngOnInit(): void {
		//setTheme();
		this.metaTagManagerService.initializeMetaTags();

		initBackToTop();
		// inject();
		// injectSpeedInsights();

	}

	
}

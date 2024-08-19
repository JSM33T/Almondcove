import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RouteSwitchService } from './services/route-switch.service';
import { initBackToTop } from './library/invokers/back-to-top';
import { SidePanelComponent } from './components/shared/side-panel/side-panel.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { BackToTopComponent } from './components/shared/back-to-top/back-to-top.component';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import setTheme from './library/invokers/settheme';
import rotateText from './library/helpers/well-hello';
import { environment } from '../environment/environment';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterModule, RouterOutlet, BackToTopComponent, FooterComponent, NavbarComponent, SidePanelComponent, LoadingBarRouterModule, LoadingBarHttpClientModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
	constructor(private routeMetaService: RouteSwitchService) {}

	ngOnInit(): void {
		setTheme();
		this.completeLoading();
		initBackToTop();
		inject();
		injectSpeedInsights();
    setInterval(rotateText, 100);
	}

	completeLoading() {
		setTimeout(function () {
			const preloader = document.querySelector('.page-loading') as HTMLDivElement;
			preloader.classList.remove('active');
      preloader.remove();
		}, environment.loaderWait);
	}
}

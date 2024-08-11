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
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

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
    TranslateModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private routeMetaService: RouteSwitchService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.completeLoading();
    initBackToTop();
    this.setLang();
    inject();
    injectSpeedInsights();
  }

  completeLoading() {
    const preloader = document.querySelector('.page-loading') as HTMLDivElement;
    preloader.classList.remove('active');
    setTimeout(function () {
      preloader.remove();
    }, 1500);
  }

  setLang() {
    const ll = localStorage.getItem('lang');
    if (ll) {
      this.translate.use(ll);
    } else {
      this.translate.use('en');
    }
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
}

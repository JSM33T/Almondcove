// import { Component, OnInit } from '@angular/core';
// import { RouterModule, RouterOutlet } from '@angular/router';
// import { RouteSwitchService } from './services/route-switch.service';
// import { initBackToTop } from './library/invokers/back-to-top';
// import { SidePanelComponent } from './components/shared/side-panel/side-panel.component';
// import { FooterComponent } from './components/shared/footer/footer.component';
// import { NavbarComponent } from './components/shared/navbar/navbar.component';
// import { BackToTopComponent } from './components/shared/back-to-top/back-to-top.component';
// import { inject } from "@vercel/analytics"
// import { injectSpeedInsights } from '@vercel/speed-insights';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterModule, RouterOutlet,BackToTopComponent, FooterComponent,NavbarComponent,SidePanelComponent],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent implements OnInit{
//   constructor(private routeMetaService: RouteSwitchService) {
//   }
//   ngOnInit(): void {
//     this.completeLoading();
//     initBackToTop();
//     inject();
//     injectSpeedInsights();
//   }

//   completeLoading()
//   {
//     const preloader = document.querySelector('.page-loading') as HTMLDivElement
//     preloader.classList.remove('active')
//     setTimeout(function () {
//       preloader.remove()
//     }, 1500)
//   }

// }
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
    inject();
    injectSpeedInsights();
    this.setLang();
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
      // Handle the case where 'lang' is not found in localStorage
      // For example, set a default language
      this.translate.use('en'); // Replace 'en' with your default language code
    }
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
}

import { Component, OnInit } from '@angular/core';
import { initializeThemeSwitcher } from '../../../library/invokers/theme-switcher';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    initializeThemeSwitcher();
    this.toggler();



  }

  toggler()
  {
    const button = document.querySelector('button.navbar-toggler') as HTMLButtonElement;
    if (button.getAttribute('aria-expanded') === 'true') {
      const bb = document.querySelector('.navbar-toggler') as HTMLButtonElement;
      bb.click();
    }
  }

}

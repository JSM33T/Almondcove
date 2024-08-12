import { Component, OnInit } from '@angular/core';
import { initializeThemeSwitcher } from '../../../library/invokers/theme-switcher';
import { RouterModule } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,NgClass,NgIf,NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  navItems = [
    { label: 'Home', link: '/', isDropdown: false },
    { 
      label: 'Artifacts', 
      isDropdown: true, 
      dropdownItems: [
        { label: 'Chronicles', link: '/chronicles' },
        { label: 'Studio', link: '/studio' }
      ],
      icon: 'bi bi-chevron-down' // Example icon class for dropdown indicator
    },
    { 
      label: 'About', 
      isDropdown: true, 
      dropdownItems: [
        { label: 'About Us', link: '/about' },
        { label: 'Contact', link: '/contact' },
        { label: 'FAQ', link: '/faq' },
        { label: 'Attributions', link: '/attributions' }
      ],
      icon: 'bi bi-chevron-down' // Example icon class for dropdown indicator
    }
  ];

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

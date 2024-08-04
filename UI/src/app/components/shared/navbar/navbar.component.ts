import { Component, OnInit } from '@angular/core';
import { initializeThemeSwitcher } from '../../../library/invokers/theme-switcher';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    initializeThemeSwitcher();
  }

}

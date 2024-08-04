import { Component, OnInit } from '@angular/core';
import { initParallax } from '../../library/invokers/parallax';
import InitAnimateOnScroll from '../../library/invokers/animate-on-scroll';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
    initParallax();
    // InitAnimateOnScroll();
  }

}

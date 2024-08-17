import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import InitAnimateOnScroll from '../../library/invokers/animate-on-scroll';
import { initParallax } from '../../library/invokers/parallax';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
   InitAnimateOnScroll();
   initParallax();
  }

}

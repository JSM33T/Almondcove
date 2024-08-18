import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { initParallax } from '../../library/invokers/parallax';
import initAOS, { cleanAOS } from '../../library/invokers/animate-on-scroll';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule,NgFor],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit ,OnDestroy{

  socialLinks = [
    {
        platform: 'Instagram',
        icon: 'ai-instagram',
        url: 'https://instagram.com/jsm33t',
    },
    {
        platform: 'Facebook',
        icon: 'ai-facebook',
        url: 'https://facebook.com/iamjsm33t',
    },
    {
        platform: 'YouTube',
        icon: 'ai-github',
        url: 'https://github.com/jsm33t',
    },
];


  ngOnDestroy(): void {
    cleanAOS();
  }

  ngOnInit(): void {
    initParallax();
    initAOS();
  }
  

}

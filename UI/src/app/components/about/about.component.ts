import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { initParallax } from '../../library/invokers/parallax';
import InitAnimateOnScroll from '../../library/invokers/animate-on-scroll';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

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

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    initParallax();
    InitAnimateOnScroll();
  }

}

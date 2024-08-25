import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { InitMasonryGrid } from '../../library/invokers/masonry_grid';
import { JsonPipe, NgFor } from '@angular/common';
import Initswiper from '../../library/invokers/swiper';
import { RouterLink } from '@angular/router';
import initAOS, { cleanAOS } from '../../library/invokers/animate-on-scroll';
import { environment } from '../../../environment/environment';


@Component({
	selector: 'app-studio',
	standalone: true,
	imports: [NgFor,RouterLink],
	templateUrl: './studio.component.html',
	styleUrl: './studio.component.css',
  providers:[]
})
export class StudioComponent implements OnInit,OnDestroy,AfterViewInit {

  
  ngAfterViewInit(): void {
    this.cleanupFn = InitMasonryGrid();
  }

  ngOnInit(): void {
    Initswiper();
    initAOS();
  }

  private cleanupFn?: () => void;
  assetLocation : string = environment.apiUrl + "/content/studio/"

  items = [
    {
      imgSrc: 'singles/melancholy/assets/cover_thumb.jpg',
      title: 'Melancholy',
      link: 'melancholy',
      categories: ['branding'],
      year: 2022,
      group : ['singles']
    },
    {
      imgSrc: 'singles/singularity/assets/cover_thumb.jpg',
      title: 'Singularity',
      link: 'singularity',
      categories: ['branding'],
      year: 2022,
      group : ['singles']
    },
    {
      imgSrc: 'albums/tcr-bootleg-compilation-2023/assets/cover_thumb.png',
      title: 'The Coffeeroom Bootleg',
      link: 'the-coffeeroom-bootleg',
      categories: ['web'],
      year: 2022,
      group :['albums']
    },
    {
      imgSrc: 'albums/recuerdos-1/assets/cover_thumb.jpg',
      title: 'Recuerdos 1',
      link: '#',
      categories: ['web'],
      year: 2022,
      group :['albums']
    },
    {
      imgSrc: 'albums/recuerdos-2/assets/cover_thumb.jpg',
      title: 'Recuerdos 2',
      link: '#',
      categories: ['web'],
      year: 2022,
      group :['albums']
    },
  ];

  ngOnDestroy() {
    if (this.cleanupFn) {
      this.cleanupFn();
    }
    cleanAOS();
  }
  getGroupsJson(groups: string[]): string {
    return JSON.stringify(groups);
  }

}

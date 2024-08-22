import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { InitMasonryGrid } from '../../library/invokers/masonry_grid';
import { JsonPipe, NgFor } from '@angular/common';
import Initswiper from '../../library/invokers/swiper';
import { RouterLink } from '@angular/router';


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
  }

  private cleanupFn?: () => void;

  items = [
    {
      imgSrc: 'https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Melancholy',
      link: 'melancholy',
      categories: ['branding'],
      year: 2022,
      group : ['singles']
    },
    {
      imgSrc: 'https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'The Coffeeroom Bootleg',
      link: 'the-coffeeroom-bootleg',
      categories: ['web'],
      year: 2022,
      group :['albums']
    },
    {
      imgSrc: 'https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Titli -(DnB Bootleg)',
      link: '#',
      categories: ['web'],
      year: 2022,
      group :['singles']
    },
    {
      imgSrc: 'https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Bulleya -(DnB Bootleg)',
      link: '#',
      categories: ['web'],
      year: 2022,
      group :['singles']
    },
    {
      imgSrc: 'https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Recuerdos 1',
      link: '#',
      categories: ['web'],
      year: 2022,
      group :['albums']
    },
    {
      imgSrc: 'https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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
  }
  getGroupsJson(groups: string[]): string {
    return JSON.stringify(groups);
  }

}

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { InitMasonryGrid } from '../../library/invokers/masonry_grid';
import { JsonPipe, NgFor } from '@angular/common';


@Component({
	selector: 'app-studio',
	standalone: true,
	imports: [NgFor],
	templateUrl: './studio.component.html',
	styleUrl: './studio.component.css',
  providers:[]
})
export class StudioComponent implements OnInit,OnDestroy,AfterViewInit {
  ngAfterViewInit(): void {
    this.cleanupFn = InitMasonryGrid();
  }

  ngOnInit(): void {
  }

  private cleanupFn?: () => void;

  items = [
    {
      imgSrc: 'assets/img/portfolio/grid/07.jpg',
      title: 'Melancholy',
      link: '#',
      categories: ['branding'],
      year: 2022,
      group : ['singles']
    },
    {
      imgSrc: 'assets/img/portfolio/grid/07.jpg',
      title: 'Singularity',
      link: '#',
      categories: ['web'],
      year: 2022,
      group :['singles']
    },
    {
      imgSrc: 'assets/img/portfolio/grid/07.jpg',
      title: 'Titli -(DnB Bootleg)',
      link: '#',
      categories: ['web'],
      year: 2022,
      group :['singles']
    },
    {
      imgSrc: 'assets/img/portfolio/grid/07.jpg',
      title: 'Bulleya -(DnB Bootleg)',
      link: '#',
      categories: ['web'],
      year: 2022,
      group :['singles']
    },
    {
      imgSrc: 'assets/img/portfolio/grid/07.jpg',
      title: 'Recuerdos 1',
      link: '#',
      categories: ['web'],
      year: 2022,
      group :['albums']
    },
    {
      imgSrc: 'assets/img/portfolio/grid/07.jpg',
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

import { NgFor } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import initAOS, { cleanAOS } from '../../library/invokers/animate-on-scroll';

@Component({
	selector: 'app-artifacts',
	standalone: true,
	imports: [RouterModule, NgFor],
	templateUrl: './artifacts.component.html',
	styleUrl: './artifacts.component.css',
})
export class ArtifactsComponent implements OnInit,OnDestroy,AfterViewInit {
	ngAfterViewInit(): void {
		initAOS();
	}
	ngOnDestroy(): void {
		cleanAOS();
	}
	ngOnInit(): void {
		
	}

	cardData = [
		{
			Title: 'Lightroom Presets',
			Description: 'Lightroom presets crafted for yall',
			Logo: './assets/images/artifacts/photography.svg',
			Aos:'flip-up',
			Duration:'300'
		}
	];

  cardData2 = [
		{
			Title: 'Sample packs',
			Description: 'Music production sample packs',
			Logo: './assets/images/artifacts/music.svg',
			Aos:'flip-down',
			Duration:'600'
		}
	];
}

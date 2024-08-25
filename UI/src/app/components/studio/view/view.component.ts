import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { destroyParallax, initParallax } from '../../../library/invokers/parallax';

@Component({
	selector: 'app-view',
	standalone: true,
	imports: [],
	templateUrl: './view.component.html',
	styleUrl: './view.component.css',
})
export class ViewComponent implements OnInit, OnDestroy {
	slug: string = '';
	htmlContent: SafeHtml = '';

	constructor(private route: ActivatedRoute, private http: HttpClient, private sanitizer: DomSanitizer) {}
	ngOnDestroy(): void {
		destroyParallax();
	}

	ngOnInit(): void {
		this.slug = this.route.snapshot.paramMap.get('slug') || '';
		if (this.slug) {
			this.loadView(this.slug);
		}
	}

	private loadView(slug: string): void {
		const filePath = `./assets/pages/studio/${slug}/index.html`;

		this.http.get(filePath, { responseType: 'text' }).subscribe({
			next: (data) => {
				const replacedData = data.replace(/{{baseadd}}/g, environment.apiUrl);
				this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(replacedData);
        setTimeout(() => {
          initParallax();
        }, 100);
				
			},
			error: (error) => {
				console.error('Error loading HTML file:', error);
			},
			complete: () => {
				console.log('HTML file loaded successfully');
			},
		});
	}
}

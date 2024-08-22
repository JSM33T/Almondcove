import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {
  slug: string = '';
  htmlContent: SafeHtml = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

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
        this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(data);
      },
      error: (error) => {
        console.error('Error loading HTML file:', error);
      },
      complete: () => {
        console.log('HTML file loaded successfully');
      }
    });
  }
}

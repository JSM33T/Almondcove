import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { APIResponse } from '../../../library/interfaces/api-response.model';
import { Observable } from 'rxjs';
import { ResponseHandlerService } from '../../../library/helpers/response-handler';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [NgIf],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']  // Corrected to styleUrls
})
export class ViewComponent implements OnInit {
  slug: string = '';
  year:string = '';
  isLoading = false;
  content: SafeHtml = '';  // For holding sanitized HTML content

  constructor(
    private route: ActivatedRoute,
    private httpService : HttpService,
    private responseHandler : ResponseHandlerService,
    private sanitizer: DomSanitizer  // Inject DomSanitizer
  ) {}

  ngOnInit(): void {
    // Capture the slug from the route parameters
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.year = this.route.snapshot.paramMap.get('year')!;
    console.log('Viewing artifact with slug:', this.slug);
    this.getData();
  }

  getData() {
    const response$: Observable<APIResponse<any>> = this.httpService.get(`api/artifact/load/${this.year}/${this.slug}`);
 
    this.responseHandler.handleResponse(response$, false).subscribe({
      next: async (response) => {
        const markdownContent = response.data;
        const htmlContent =await marked(markdownContent);  
        this.content = this.sanitizer.bypassSecurityTrustHtml(htmlContent); 
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error.error);
        this.isLoading = false;
      },
    });
  }
}

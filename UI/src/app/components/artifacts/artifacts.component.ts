// import { Component } from '@angular/core';
// import { ActivatedRoute, RouterModule } from '@angular/router';
// import { BlogSidepaneComponent } from '../shared/blog-sidepane/blog-sidepane.component';
// import { NgFor, NgIf } from '@angular/common';
// import { environment } from '../../../environment/environment';
// import { HttpService } from '../../services/http.service';
// import { APIResponse } from '../../library/interfaces/api-response.model';
// import { Observable } from 'rxjs';
// import { ResponseHandlerService } from '../../library/helpers/response-handler';

// @Component({
//   selector: 'app-artifacts',
//   standalone: true,
//   imports: [RouterModule,BlogSidepaneComponent,NgFor,NgIf],
//   templateUrl: './artifacts.component.html',
//   styleUrl: './artifacts.component.css'
// })
// export class ArtifactsComponent {
//   isLoading = false;
//   blogs: any[] = [];
//   cover: string = environment.apiUrl;
//   currentCategory: string | null = null;
//   currentTag: string | null = null;
//   currentYear: number | null = null;
//   searchTerm: string = '';

//   constructor(
//       private httpService: HttpService,
//       private route: ActivatedRoute,
//       private responseHandler: ResponseHandlerService
//   ) {}

//   ngOnInit(): void {
//       // Subscribe to query params changes
//       this.route.queryParams.subscribe(params => {
//           this.currentCategory = params['category'] || null;
//           this.currentTag = params['tag'] || null;
//           this.currentYear = params['year'] ? parseInt(params['year']) : null;
//           this.searchTerm = params['search'] || '';
//           this.loadBlogs();
//       });
//   }

//   ARTIFACT_REQUEST_SAMPLE = {
//     pageNumber: 0,
//     pageSize: 0,
//     searchString: "",
//     type: "",
//     category: "",
//     tag: "",
//     year: 0
//   };
 
//   loadBlogs() {
//       this.isLoading = true;
  
//       // Build query parameters
//       let queryParams: string[] = [];
//       if (this.currentCategory) queryParams.push(`category=${this.currentCategory}`);
//       if (this.currentTag) queryParams.push(`tag=${this.currentTag}`);
//       if (this.currentYear) queryParams.push(`year=${this.currentYear}`);
//       if (this.searchTerm) queryParams.push(`search=${this.searchTerm}`);
  
//       // Join query parameters
//       const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
  

     

//       // Make the GET request with the constructed URL
//       const response$: Observable<APIResponse<any>> = this.httpService.post(`api/artifacts/${queryString}`,this.ARTIFACT_REQUEST_SAMPLE);
  
//       this.responseHandler.handleResponse(response$, false).subscribe({
//           next: (response) => {
//               this.isLoading = false;
//               if (response.status == 200) {
//                   this.blogs = response.data;
//               }
//           },
//           error: () => {
//               this.isLoading = false;
//           },
//       });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogSidepaneComponent } from '../shared/blog-sidepane/blog-sidepane.component';
import { NgFor, NgIf } from '@angular/common';
import { environment } from '../../../environment/environment';
import { HttpService } from '../../services/http.service';
import { APIResponse } from '../../library/interfaces/api-response.model';
import { Observable } from 'rxjs';
import { ResponseHandlerService } from '../../library/helpers/response-handler';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-artifacts',
  standalone: true,
  imports: [RouterModule, BlogSidepaneComponent, NgFor, NgIf],
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.css'],
  providers: [DatePipe] 
})
export class ArtifactsComponent implements OnInit {
  isLoading = false;
  artifacts: any[] = [];
  cover: string = environment.apiUrl;
  currentCategory: string | null = null;
  currentTag: string | null = null;
  currentYear: number | null = null;
  searchTerm: string = '';

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private responseHandler: ResponseHandlerService,
    private datePipe: DatePipe
  ) {}

  formatDate(date: Date): string {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return formattedDate ? formattedDate.substring(0,4) : '';
  }
  // formatDate(date: Date): string {
  //   // Extract the year as a string
  //   const year = date.getFullYear().toString();
  //   return year.substring(0, 4); // Ensure to return only the first 4 characters
  // }
  

  ngOnInit(): void {
    // Subscribe to query params changes
    this.route.queryParams.subscribe(params => {
      this.currentCategory = params['category'] || null;
      this.currentTag = params['tag'] || null;
      this.currentYear = params['year'] ? parseInt(params['year']) : null;
      this.searchTerm = params['search'] || '';

      // Update the request sample with the query params
      this.ARTIFACT_REQUEST_SAMPLE.category = this.currentCategory || '';
      this.ARTIFACT_REQUEST_SAMPLE.tag = this.currentTag || '';
      this.ARTIFACT_REQUEST_SAMPLE.year = this.currentYear;
      this.ARTIFACT_REQUEST_SAMPLE.searchString = this.searchTerm;

      this.loadBlogs();
    });
  }

  ARTIFACT_REQUEST_SAMPLE = {
    pageNumber: 1,  
    pageSize: 10,   
    searchString: '',
    type: '',
    category: '',
    tag: '',
    year: 0 as number | null,  // Explicitly type year to accept number or null
    fromDate: '',
    toDate: ''
  };

  loadBlogs() {
    this.isLoading = true;

    // Make the POST request with the request sample
    const response$: Observable<APIResponse<any>> = this.httpService.post(`api/artifact/search`, this.ARTIFACT_REQUEST_SAMPLE);
    this.responseHandler.handleResponse(response$, false).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.status == 200) {
          console.log(response);
          this.artifacts = response.data.items;
        }
        else
        {
          this.artifacts = [];
        }
      },
      error: () => {
        this.isLoading = false;
        this.artifacts = [];
        
      },
    });
  }
}

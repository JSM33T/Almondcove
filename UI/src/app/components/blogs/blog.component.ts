import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogSidepaneComponent } from '../shared/blog-sidepane/blog-sidepane.component';
import { NgFor, NgIf } from '@angular/common';
import { environment } from '../../../environment/environment';
import { HttpService } from '../../services/http.service';
import { APIResponse } from '../../library/interfaces/api-response.model';
import { Observable } from 'rxjs';
import { ResponseHandlerService } from '../../library/helpers/response-handler';
import { DatePipe } from '@angular/common';
import initAOS, { cleanAOS } from '../../library/invokers/animate-on-scroll';

@Component({
	selector: 'app-blogs',
	standalone: true,
	imports: [RouterModule, BlogSidepaneComponent, NgFor, NgIf],
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.css'],
	providers: [DatePipe],
})
export class BlogComponent implements OnInit, OnDestroy {
	isLoading = false;
	blogs: any[] = [];
	cover: string = environment.apiUrl;
	currentCategory: string | null = null;
	currentTag: string | null = null;
	currentYear: number | null = null;
	searchTerm: string = '';
	loadingStat = 'loading...';
	pageNo: number = 1;
	pageSize: number = 10;
	totalPages: number = 0;
	totalRecords: number = 0;

	constructor(
		private httpService: HttpService,
		private route: ActivatedRoute,
		private responseHandler: ResponseHandlerService,
		private datePipe: DatePipe
	) {}

	blogRequest = {
		pageNumber: this.pageNo,
		pageSize: this.pageSize,
		searchString: '',
		category: '',
		tag: '',
		year: 0 as number | null,
		toDate: '',
	};

	ngOnInit(): void {
		initAOS();
		// Subscribe to query params changes
		this.route.queryParams.subscribe((params) => {
			this.currentCategory = params['category'] || null;
			this.currentTag = params['tag'] || null;
			this.currentYear = params['year'] ? parseInt(params['year']) : null;
			this.searchTerm = params['search'] || '';

			// Update the request sample with the query params
			this.blogRequest.category = this.currentCategory || '';
			this.blogRequest.tag = this.currentTag || '';
			this.blogRequest.year = this.currentYear;
			this.blogRequest.searchString = this.searchTerm;

			this.loadBlogs();
		});
	}

	ngOnDestroy(): void {
		cleanAOS();
	}

	formatDate(date: Date): string {
		const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
		return formattedDate ? formattedDate.substring(0, 4) : '';
	}

	resetPagination() {
		this.pageNo = 0;
		this.totalRecords = 0;
		this.totalPages = 0;
	}
	loadBlogs() {
		this.isLoading = true;

		// Make the POST request with the request sample
		const response$: Observable<APIResponse<any>> = this.httpService.post(`api/blog/search`, this.blogRequest);
		this.responseHandler.handleResponse(response$, false).subscribe({
			next: (response) => {
				this.isLoading = false;
				if (response.status == 200) {
					console.log(response.data);
					this.blogs = response.data.items;
					this.pageNo = response.data.currentPage;
					this.totalRecords = response.data.totalRecords;
					this.totalPages = response.data.totalPages;
				} else if (response.status == 404) {
					this.blogs = [];
					this.loadingStat = 'no blogs found with this criteria';
					this.resetPagination();
				} else {
					this.blogs = [];
					this.loadingStat = 'error loading blogs';
				}
			},
			error: () => {
				this.isLoading = false;
				this.blogs = [];
				this.loadingStat = 'error loading blogs';
			},
		});
	}
}

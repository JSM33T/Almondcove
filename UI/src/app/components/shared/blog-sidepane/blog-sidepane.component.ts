import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { Router, RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { APIResponse } from '../../../library/interfaces/api-response.model';
import { ResponseHandlerService } from '../../../library/helpers/response-handler';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-sidepane',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './blog-sidepane.component.html',
  styleUrls: ['./blog-sidepane.component.css']
})
export class BlogSidepaneComponent implements OnInit {
    isLoading = true;
    totalBlogCount: number = 0;
    searchForm: FormGroup;
    blogCategories: any = [];
    years: number[] = [2023, 2024];

    constructor(
      private fb: FormBuilder,
      private httpService: HttpService,
      private router: Router,
      private responseHandler: ResponseHandlerService,
    ) {
        this.searchForm = this.fb.group({
            search: ['']
        });
    }

    ngOnInit(): void {
        this.loadCategories();
        this.setupSearchListener();
    }

    loadCategories() {
        const response$: Observable<APIResponse<any>> = this.httpService.get('api/blog/getcategories');
        this.responseHandler.handleResponse(response$, false).subscribe({
            next: (response) => {
                this.isLoading = false;
                if (response.status === 200) {
                    this.blogCategories = response.data;
                    this.totalBlogCount = this.blogCategories.reduce((sum : number, category : any) => sum + category.blogCount, 0);
                }
            },
            error: () => {
                this.isLoading = false;
            },
        });
    }

    setupSearchListener() {
        this.searchForm.get('search')?.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(searchTerm => {
            if (searchTerm) {
                this.router.navigate(['/blogs'], { queryParams: { search: searchTerm } });
            } else {
                this.router.navigate(['/blogs']);
            }
        });
    }
}

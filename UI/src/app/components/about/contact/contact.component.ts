import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../../../library/interfaces/api-response.model';
import { handleResponse } from '../../../library/helpers/response-handler';
import { HttpService } from '../../../services/http.service';
import { NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit,OnDestroy {
  loadingBarState: any;
  messageForm! : FormGroup;
    isLoading = false;

    constructor(
        private httpService: HttpService,private fb : FormBuilder
    ) {
      this.messageForm = this.fb.group({
        name: new FormControl(''),
        email: new FormControl(''),
        topic: new FormControl(''),
        origin: new FormControl(''),
        content: new FormControl(''),
      });
    }

    ngOnInit(): void {
       
    }

    ngOnDestroy(): void {
        
    }

    onSubmit(): void {
        this.isLoading = true;
        const response$: Observable<APIResponse<any>> = this.httpService.post('api/messages/send', this.messageForm.value);
        console.log(this.messageForm.value);
        handleResponse(response$, true).subscribe({
            next: () => {
                this.isLoading = false;
            },
            error: () => {
                this.isLoading = false;
            },
        });
    }
}

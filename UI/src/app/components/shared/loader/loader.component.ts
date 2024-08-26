import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpService } from '../../../services/http.service';
import { ResponseHandlerService } from '../../../library/helpers/response-handler';
import { APIResponse } from '../../../library/interfaces/api-response.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-loader',
	standalone: true,
	imports: [],
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.css'], // Corrected to styleUrls
})
export class LoaderComponent implements OnInit, OnDestroy {
	constructor(private httpService: HttpService, private responseHandler: ResponseHandlerService) {}

	loaderText: string = 'loading...';
  texts: string[] = ['Hello', 'Hola', 'Bonjour', 'Ciao', 'Olá', 'Привет', 'こんにちは', '你好', '안녕하세요', 'مرحبا', 'שלום', 'नमस्ते', 'สวัสดี', 'Kamusta', 'Hej', 'Hei', 'Hallo', 'Selam', 'Ahoj', 'Merhaba', 'Sawubona', 'Jambo', 'Xin chào', 'Bula', 'Halo', 'Chào', 'Terve', 'Salut', 'Kia ora', 'Sveiki', 'Tere', 'Sain baina uu', 'Zdravo', 'Sziasztok', 'Salam', 'Hallå', 'Dzień dobry', 'Γειά σου', 'Hallo', 'Aloha'];

	currentIndex: number = 0;
	intervalId: any;

	ngOnInit(): void {
		this.intervalId = setInterval(() => this.rotateText(), 100);
		this.serverHealthCheck();
	}

	serverHealthCheck() {
		const response$: Observable<APIResponse<any>> = this.httpService.get('');

		this.responseHandler.handleResponse(response$, false).subscribe({
			next: (response) => {
				this.stopTextRotation();
				if (response.status == 200) {
					this.completeLoading();
				} else {
					this.failedResponse();
				}
			},
			error: (error) => {
				this.failedResponse();
			},
		});
	}

	ngOnDestroy(): void {
		this.stopTextRotation();
	}

	stopTextRotation(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}

	completeLoading() {
		const preloader = document.querySelector('.page-loading') as HTMLDivElement;
		if (preloader) {
			preloader.classList.remove('active');
			preloader.remove();
		}
	}

	failedResponse() {
		this.loaderText = 'Server health check failed! please check your internet connection';
	}

	// errorLoading() {
	// 	const preloader = document.querySelector('.page-loading') as HTMLDivElement;
	// 	if (preloader) {
	// 		preloader.classList.remove('active');
	// 		preloader.remove();
	// 	}
	// }

	rotateText() {
		this.loaderText = this.texts[this.currentIndex];
		this.currentIndex = (this.currentIndex + 1) % this.texts.length;
	}
}

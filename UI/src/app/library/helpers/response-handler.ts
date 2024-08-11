// // Import necessary modules and services
// import acServerToast from '../../library/modals/server-response-modal';
// import { Observable, catchError, of, tap } from 'rxjs';
// import acToast from '../modals/notification-modal';
// import { APIResponse } from '../interfaces/api-response.model';
// import { TranslateService } from '@ngx-translate/core'; // Import TranslateService


// export function handleResponse(
//     observable: Observable<APIResponse<any>>, 
//     translate: TranslateService,
//     showToast: boolean = false
// ): Observable<APIResponse<any>> {
//     return observable.pipe(
//         tap((response) => {
//             if (showToast) {
//                 acServerToast(response, translate); // Pass translate to acServerToast
//             }
//         }),
//         catchError((error) => {
//             if (error.error == undefined) {
//                 acToast('Error', 'API not reachable: some parts of the app will not work as expected');
//             } else {
//                 if (showToast) {
//                     acServerToast(error.error, translate); // Pass translate to acServerToast
//                 }
//             }

//             return of(error);
//         })
//     );
// }
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import acToast from '../modals/notification-modal';
import { APIResponse } from '../interfaces/api-response.model';
import { ToastService } from '../../services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ResponseHandlerService {
  constructor(private toastService: ToastService) {}

  handleResponse(
    observable: Observable<APIResponse<any>>,
    showToast: boolean = false,
    someBoolean: boolean = false
  ): Observable<APIResponse<any>> {
    return observable.pipe(
      tap((response) => {
        if (showToast) {
          this.toastService.showToast(response, someBoolean);
        }
      }),
      catchError((error) => {
        if (error.error == undefined) {
          acToast('Error', 'API not reachable: some parts of the app will not work as expected');
        } else {
          if (showToast) {
            this.toastService.showToast(error.error, someBoolean);
          }
        }
        return of(error);
      })
    );
  }
}

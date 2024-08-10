
import acServerToast from '../../library/modals/server-response-modal';
import { Observable, catchError, of, tap } from 'rxjs';
import acToast from '../modals/notification-modal';
import { APIResponse } from '../interfaces/api-response.model';

export function handleResponse(observable: Observable<APIResponse<any>>, showToast: boolean = false): Observable<APIResponse<any>> {
    debugger;
    return observable.pipe(
        tap((response) => {
            if (showToast) {
                acServerToast(response);
            }
        }),
        catchError((error) => {
            if (error.error == undefined) {
                acToast('Error', 'API not reachable : some parts of the app will not work as expected');
            } else {
                if (showToast) {
                    acServerToast(error.error);
                }
            }

            return of(error);
        })
    );
}

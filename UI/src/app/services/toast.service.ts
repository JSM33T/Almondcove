// import { Injectable } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
// import { APIResponse } from '../library/interfaces/api-response.model';


// declare var bootstrap: any;

// @Injectable({
//   providedIn: 'root',
// })
// export class ToastService {
//   constructor(private translate: TranslateService) {}

//   showToast(response: APIResponse<any>, someBoolean: boolean = false): void {
//     const statusTitles: { [key: number]: string } = {
//       200: 'CONTACT.NAME',
//       201: 'Created',
//       400: 'CONTACT.NAME',
//       401: 'Unauthorized',
//       403: 'Forbidden',
//       404: 'Not Found',
//       410: 'Expired',
//       500: 'Server Error',
//       429: 'Spam detected',
//     };

//     const titleKey = statusTitles[response.status] || 'Notice';

//     if (this.translate) {
//       // Use TranslateService if available
//       this.translate.get(titleKey).subscribe((translatedTitle: string) => {
//         this.showModal(translatedTitle, response, someBoolean);
//       });
//     } else {
//       // Use the titleKey directly if TranslateService is not provided
//       this.showModal(titleKey, response, someBoolean);
//     }
//   }

//   private showModal(title: string, response: APIResponse<any>, someBoolean: boolean): void {
//     const modalContainer = document.createElement('div');
//     modalContainer.classList.add('modal', 'fade');
//     modalContainer.setAttribute('tabindex', '-1');
//     modalContainer.setAttribute('role', 'dialog');
//     modalContainer.setAttribute('aria-hidden', 'true');
//     modalContainer.setAttribute('data-bs-backdrop', 'static');

//     let errorListHtml = '';
//     if (response.hints && response.hints.length > 0) {
//       errorListHtml = '<code class="text-primary">';
//       response.hints.forEach((hint) => {
//         errorListHtml += `<li>${hint}</li>`;
//       });
//       errorListHtml += '</code>';
//     }

//     if (someBoolean) {
//       // Handle the boolean logic here if needed
//       // For example, you might want to log something or change the modal's appearance
//     }

//     modalContainer.innerHTML = `
//       <div class="modal-dialog" role="document" data-bs-backdrop="static" data-bs-keyboard="false">
//         <div class="modal-content">
//           <div class="modal-header">
//             <h5 class="modal-title">${title}</h5>
//             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div class="modal-body">
//             <p>${response.message}</p>
//             <span>${errorListHtml}</span>
//           </div>
//           <div class="modal-footer">
//             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ok</button>
//           </div>
//         </div>
//       </div>
//     `;

//     document.body.appendChild(modalContainer);

//     const modal = new bootstrap.Modal(modalContainer);
//     modal.show();

//     modalContainer.addEventListener('hidden.bs.modal', function () {
//       document.body.removeChild(modalContainer);
//     });
//   }
// }
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { APIResponse } from '../library/interfaces/api-response.model';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

declare var bootstrap: any;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private translate: TranslateService) {}

  showToast(response: APIResponse<any>, someBoolean: boolean = false): void {
    const statusTitles: { [key: number]: string } = {
      200: 'TOAST.OK',
      201: 'TOAST.OK',
      400: 'TOAST.BAD_REQUEST',
      401: 'TOAST.UNAUTHORIZED',
      403: 'TOAST.FORBIDDEN',
      404: 'TOAST.NOT_FOUND',
      410: 'TOAST.EXPIRED',
      500: 'TOAST.SERVER_ERROR',
      429: 'TOAST.SPAM_DETECTED',
    };

    const titleKey = statusTitles[response.status] || 'TOAST.NOTICE';

    // Translate title, message, and hints
    this.getTranslations(titleKey, response.message, response.hints).subscribe(
      ([translatedTitle, translatedMessage, translatedHints]) => {
        this.showModal(translatedTitle, translatedMessage, translatedHints, someBoolean);
      }
    );
  }

  private getTranslations(titleKey: string, message: string, hints: string[]): Observable<[string, string, string[]]> {
    return forkJoin([
      this.translate.get(titleKey),
      this.translate.get(message),
      ...hints.map(hint => this.translate.get(hint))
    ]).pipe(
      map(([title, message, ...translatedHints]) => [title, message, translatedHints] as [string, string, string[]])
    );
  }

  private showModal(title: string, message: string, hints: string[], someBoolean: boolean): void {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal', 'fade');
    modalContainer.setAttribute('tabindex', '-1');
    modalContainer.setAttribute('role', 'dialog');
    modalContainer.setAttribute('aria-hidden', 'true');
    modalContainer.setAttribute('data-bs-backdrop', 'static');

    let errorListHtml = '';
    if (hints && hints.length > 0) {
      errorListHtml = '<code class="text-primary">';
      hints.forEach((hint) => {
        errorListHtml += `<li>${hint}</li>`;
      });
      errorListHtml += '</code>';
    }

    if (someBoolean) {
      // Handle the boolean logic here if needed
    }

    modalContainer.innerHTML = `
      <div class="modal-dialog" role="document" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>${message}</p>
            <span>${errorListHtml}</span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ${this.translate.instant('TOAST.OK')}
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalContainer);

    const modal = new bootstrap.Modal(modalContainer);
    modal.show();

    modalContainer.addEventListener('hidden.bs.modal', function () {
      document.body.removeChild(modalContainer);
    });
  }
}
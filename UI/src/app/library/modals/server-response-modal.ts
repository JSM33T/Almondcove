import { TranslateService } from '@ngx-translate/core';
import { APIResponse } from '../interfaces/api-response.model';

declare var bootstrap: any;

export default function acServerToast(
  response: APIResponse<any>, 
  translate?: TranslateService,  // Optional TranslateService
  someBoolean: boolean = false   // Optional boolean parameter
) {
  const statusTitles: { [key: number]: string } = {
    200: 'CONTACT.NAME',
    201: 'Created',
    400: 'CONTACT.NAME',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    410: 'Expired',
    500: 'Server Error',
    429: 'Spam detected',
  };

  const titleKey = statusTitles[response.status] || 'Notice';

  if (translate) {
    // Use TranslateService if provided
    translate.get(titleKey).subscribe((translatedTitle: string) => {
      showModal(translatedTitle, response, someBoolean);
    });
  } else {
    // Use the titleKey directly if TranslateService is not provided
    showModal(titleKey, response, someBoolean);
  }
}

function showModal(title: string, response: APIResponse<any>, someBoolean: boolean) {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal', 'fade');
  modalContainer.setAttribute('tabindex', '-1');
  modalContainer.setAttribute('role', 'dialog');
  modalContainer.setAttribute('aria-hidden', 'true');
  modalContainer.setAttribute('data-bs-backdrop', 'static');

  let errorListHtml = '';
  if (response.hints && response.hints.length > 0) {
    errorListHtml = '<code class="text-primary">';
    response.hints.forEach((hint) => {
      errorListHtml += `<li>${hint}</li>`;
    });
    errorListHtml += '</code>';
  }

  if (someBoolean) {
    // Handle the boolean logic here if needed
    // For example, you might want to log something or change the modal's appearance
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
          <p>${response.message}</p>
          <span>${errorListHtml}</span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ok</button>
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

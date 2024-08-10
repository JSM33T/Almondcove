import { APIResponse } from '../interfaces/api-response.model';

declare var bootstrap: any;

export default function acServerToast(response: APIResponse<any>) {
  // Define a mapping of status codes to titles
  const statusTitles: { [key: number]: string } = {
    200: 'Success',
    201: 'Created',
    400: 'Error',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    410: 'Expired',
    500: 'Server Error',
    429: 'Spam detected',
    // Add more status codes and their corresponding titles as needed
  };

  // Get the title based on the response status, default to 'Notice' if not found
  const title = statusTitles[response.status] || 'Notice';

  // Create the modal container
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal', 'fade');
  modalContainer.setAttribute('tabindex', '-1');
  modalContainer.setAttribute('role', 'dialog');
  modalContainer.setAttribute('aria-hidden', 'true');
  modalContainer.setAttribute('data-bs-backdrop', 'static');

  // Create the error list HTML
  let errorListHtml = '';
  if (response.hints && response.hints.length > 0) {
    errorListHtml = '<code class="text-primary">';
    response.hints.forEach((hint) => {
      errorListHtml += `<li>${hint}</li>`;
    });
    errorListHtml += '</code>';
  }

  // Set the inner HTML of the modal container using template string
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
          <span>${errorListHtml}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  `;

  // Append the modal container to the body
  document.body.appendChild(modalContainer);

  // Initialize and show the modal using Bootstrap's JavaScript API
  const modal = new bootstrap.Modal(modalContainer);
  modal.show();

  // Remove the modal from the DOM after it is hidden
  modalContainer.addEventListener('hidden.bs.modal', function () {
    document.body.removeChild(modalContainer);
  });
}

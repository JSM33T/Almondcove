declare var bootstrap: any;

export default function acToast(title: string, message: string) {
    // Create the modal container
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal', 'fade');
    modalContainer.setAttribute('tabindex', '-1');
    modalContainer.setAttribute('role', 'dialog');
    modalContainer.setAttribute('aria-hidden', 'true');
    modalContainer.setAttribute('data-bs-backdrop', 'static');

    // Set the inner HTML of the modal container using template string
    modalContainer.innerHTML = `
      <div class="modal-dialog" role="document" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-primary">
            ${message}
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

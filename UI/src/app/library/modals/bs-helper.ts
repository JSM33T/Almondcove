 declare var bootstrap: any;

// export function ShowModal(id: string) {
//     const modalElement = document.getElementById(id);
//     const myModal = new bootstrap.Modal(modalElement);
//     myModal.show();
// }

// export function HideModal(id: string) {
//     const modalElement = document.getElementById(id);
//     const myModal = new bootstrap.Modal(modalElement);
//     myModal.hide();
// }
//@ts-ignore
const modalInstances: { [key: string]: bootstrap.Modal } = {};

export function ShowModal(id: string) {
    const modalElement = document.getElementById(id);
    if (!modalElement) {
        console.error(`Modal element with id "${id}" not found.`);
        return;
    }
    const myModal = new bootstrap.Modal(modalElement);
    modalInstances[id] = myModal;
    myModal.show();
}

export function HideModal(id: string) {
    const myModal = modalInstances[id];
    if (!myModal) {
        console.error(`Modal instance with id "${id}" not found.`);
        return;
    }
    myModal.hide();
    delete modalInstances[id];
}

//@ts-nocheck
export default function InitTogglePassword() {
    const elements = document.querySelectorAll('.password-toggle');

    for (let i = 0; i < elements.length; i++) {
        const passInput = elements[i].querySelector('.form-control');
        const passToggle = elements[i].querySelector('.password-toggle-btn');

        passToggle?.addEventListener(
            'click',

            (e) => {
                if (e.target.type !== 'checkbox') return;
                if (e.target.checked) {
                    passInput.type = 'text';
                } else {
                    passInput.type = 'password';
                }
            },
            false,
        );
    }
}

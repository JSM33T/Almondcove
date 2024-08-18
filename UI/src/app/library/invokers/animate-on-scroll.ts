import Aos from 'aos';

export default function initAOS() {
	const animationToggle = document.querySelector('[data-aos]');

	if (animationToggle === null) return;

	Aos.refresh();
	Aos.init();
}

export function enableAOS() {
	Aos.init({
		disable: false,
	});
}
export function disableAOS() {
	Aos.init({
		disable: true,
	});
}

export function cleanAOS() {
	Aos.refreshHard();
}

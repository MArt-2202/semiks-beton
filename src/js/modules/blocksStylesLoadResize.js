export default function blocksStylesLoadResize() {
	if (
		document.querySelector('.selection-steps .container') &&
		document.querySelector('.selection-steps h2')
	) {
		const container = document.querySelector('.selection-steps .container'),
			title = document.querySelector('.selection-steps h2');

		if (window.matchMedia('(min-width: 1231px)').matches) {
			if (title.clientWidth < container.clientWidth) {
				title.style.width = `${container.clientWidth / 2}px`;
				title.style.opacity = 1;
			}
		}
		if (window.matchMedia('(max-width: 1230px)').matches) {
			title.style.width = '';
			title.style.opacity = '';
		}
	}
}

export default function tableWrapper() {
	if (document.querySelector('table')) {
		document.querySelectorAll('table').forEach((el) => {
			const elWr = document.createElement('div');
			elWr.classList.add('scroll-table-content');

			el.before(elWr);
			elWr.append(el);
		});
	}
}

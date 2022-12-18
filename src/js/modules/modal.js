export default function modal() {
	if (document.querySelector('.modal-btn')) {
		document.querySelectorAll('.modal-btn').forEach((el) => {
			el.addEventListener('click', function (e) {
				e.preventDefault();

				if (el.dataset.modalBtn !== '') {
					const targetModal = document.querySelector(`[data-modal="${el.dataset.modalBtn}"]`);

					targetModal.classList.remove('dn');
					setTimeout(() => {
						targetModal.classList.add('show');
					}, 50);

					document.body.style.paddingRight =
						window.innerWidth - document.documentElement.clientWidth + 'px';
					document.body.style.overflowY = 'hidden';
				}
			});
		});
	}

	if (document.querySelector('.modal-overlay')) {
		document.querySelectorAll('.modal-overlay').forEach((el) => {
			el.addEventListener('click', function (e) {
				const target = e.target;

				e.stopPropagation();

				if (!target.closest('.modal__content') || target.closest('.modal__close')) {
					el.classList.remove('show');
					setTimeout(() => {
						el.classList.add('dn');
					}, 200);

					document.body.style.overflowY = '';
					document.body.style.paddingRight = '';
				}
			});
		});
	}
}

export default function toggleContent() {
	document.addEventListener('click', toggleFunc());

	function toggleFunc() {
		return function (e) {
			const target = e.target,
				toggleWr = document.querySelector('.toggle-wrapper'),
				toggleBtn = document.querySelector('.toggle-btn'),
				toggleBtnEl = document.querySelectorAll('.toggle-btn span'),
				toggleContent = document.querySelector('.toggle-wrapper > div'),
				overlay = document.querySelector('.overlay');

			for (let i = 0; i < toggleBtnEl.length; i++) {
				if (target == toggleBtnEl[i]) {
					toggleBtn.classList.toggle('toggle-btn-style');
					toggleContent.classList.toggle('content-visible');
					overlay.classList.toggle('overlay-visible');

					if (document.querySelector('.toggle-btn-style')) {
						document.body.style.paddingRight =
							window.innerWidth - document.documentElement.clientWidth + 'px';
						document.body.style.overflowY = 'hidden';
					} else {
						if (!document.querySelector('.modal-overlay.show')) {
							document.body.style.overflowY = '';
							document.body.style.paddingRight = '';
						}
					}
				}
			}

			if (target == toggleWr || target == toggleBtn) {
				toggleBtn.classList.toggle('toggle-btn-style');
				toggleContent.classList.toggle('content-visible');
				overlay.classList.toggle('overlay-visible');
				if (document.querySelector('.toggle-btn-style')) {
					document.body.style.paddingRight =
						window.innerWidth - document.documentElement.clientWidth + 'px';
					document.body.style.overflowY = 'hidden';
				} else {
					if (!document.querySelector('.modal-overlay.show')) {
						document.body.style.overflowY = '';
						document.body.style.paddingRight = '';
					}
				}
			}

			if (!target.closest('.toggle-wrapper')) {
				toggleBtn.classList.remove('toggle-btn-style');
				toggleContent.classList.remove('content-visible'),
					overlay.classList.remove('overlay-visible');

				if (
					!document.querySelector('.modal-overlay.show') &&
					window.matchMedia('(max-width: 1200px)').matches
				) {
					document.body.style.overflowY = '';
					document.body.style.paddingRight = '';
				}
			}
		};
	}
}

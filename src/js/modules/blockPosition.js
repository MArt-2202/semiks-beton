// BLOCK POSITION
export default function blockPosition() {
	if (window.matchMedia('(min-width: 361px)').matches) {
		document.body.classList.remove('max-360');

		if (!document.body.classList.contains('min-361')) {
			document.body.classList.add('min-361');

			if (document.querySelector('.min-361')) {
			}
		}
	}

	if (window.matchMedia('(min-width: 577px)').matches) {
		document.body.classList.remove('max-360', 'max-576');

		if (!document.body.classList.contains('min-577')) {
			document.body.classList.add('min-577');

			if (document.querySelector('.min-577')) {
			}
		}
	}

	if (window.matchMedia('(min-width: 769px)').matches) {
		document.body.classList.remove('max-360', 'max-576', 'max-768');

		if (!document.body.classList.contains('min-769')) {
			document.body.classList.add('min-769');

			if (document.querySelector('.min-769')) {
			}
		}
	}

	if (window.matchMedia('(min-width: 1025px)').matches) {
		document.body.classList.remove('max-360', 'max-576', 'max-768', 'max-1024');

		if (!document.body.classList.contains('min-1025')) {
			document.body.classList.add('min-1025');

			if (document.querySelector('.min-1025')) {
			}
		}
	}

	if (window.matchMedia('(min-width: 1201px)').matches) {
		document.body.classList.remove('max-360', 'max-576', 'max-768', 'max-1024', 'max-1200');

		if (!document.body.classList.contains('min-1201')) {
			document.body.classList.add('min-1201');

			if (document.querySelector('.min-1201')) {
			}
		}
	}

	if (window.matchMedia('(max-width: 1200px)').matches) {
		document.body.classList.remove('min-1201');

		if (!document.body.classList.contains('max-1200')) {
			document.body.classList.add('max-1200');

			if (document.querySelector('.max-1200')) {
			}
		}
	}

	if (window.matchMedia('(max-width: 1024px)').matches) {
		document.body.classList.remove('min-1201', 'min-1025');

		if (!document.body.classList.contains('max-1024')) {
			document.body.classList.add('max-1024');

			if (document.querySelector('.max-1024')) {
				if (document.querySelector('.max-1024')) {
				}
			}
		}
	}

	if (window.matchMedia('(max-width: 768px)').matches) {
		document.body.classList.remove('min-1201', 'min-1025', 'min-769');

		if (!document.body.classList.contains('max-768')) {
			document.body.classList.add('max-768');

			if (document.querySelector('.max-768')) {
			}
		}
	}

	if (window.matchMedia('(max-width: 576px)').matches) {
		document.body.classList.remove('min-1201', 'min-1025', 'min-769', 'min-577', 'min-361');

		if (!document.body.classList.contains('max-576')) {
			document.body.classList.add('max-576');

			if (document.querySelector('.max-576')) {
			}
		}
	}

	if (window.matchMedia('(max-width: 360px)').matches) {
		document.body.classList.remove('min-1201', 'min-1025', 'min-769', 'min-361');

		if (!document.body.classList.contains('max-360')) {
			document.body.classList.add('max-360');

			if (document.querySelector('.max-360')) {
			}
		}
	}
}

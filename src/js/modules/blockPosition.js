// BLOCK POSITION
export default function blockPosition() {
	const bl1 = document.querySelector('.header__bl-2'),
		bl2 = document.querySelector('.header__bl-3'),
		bl3 = document.querySelector('.header__bl-4'),
		bl4 = document.querySelector('.toggle__content > div'),
		bl5 = document.querySelector('.header__nav'),
		bl6 = document.querySelector('.header__phones-wrapper'),
		bl7 = document.querySelector('.header__address'),
		bl8 = document.querySelector('.header__s_ocial'),
		bl9 = document.querySelector('.header__lang'),
		bl10 = document.querySelector('.header__bl-6'),
		title = document.querySelector('header .header__logo-company'),
		content = document.querySelector('#top-content'),
		list = document.querySelector('.breadcrumbs'),
		mainTitle = document.querySelector('.breadcrumbs + h1');

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
				if (bl9 && bl10) {
					bl10.append(bl9);
				}
				if (bl1 && bl5) {
					bl1.append(bl5);
				}
				if (bl2 && bl6) {
					bl2.append(bl6);
				}
				if (bl3 && bl7) {
					bl3.prepend(bl7);
				}
				if (bl3 && bl8) {
					bl3.append(bl8);
				}
				if (
					document.querySelector('header .header__logo-company strong') &&
					document.querySelector('#top-content')
				) {
					content.style.marginLeft = `${title.offsetWidth}px`;
					content.style.opacity = 1;
				}
				if (
					document.querySelector('header .header__logo-company') &&
					document.querySelector('.breadcrumbs') &&
					document.querySelector('.breadcrumbs + h1') &&
					!document.querySelector('.top-content') &&
					!document.querySelector('.product-details__content')
				) {
					list.style.marginLeft = `${title.offsetWidth}px`;
					list.style.opacity = 1;

					mainTitle.style.marginLeft = `${title.offsetWidth}px`;
					mainTitle.style.opacity = 1;
				}
			}
		}
	}

	if (window.matchMedia('(max-width: 1200px)').matches) {
		document.body.classList.remove('min-1201');

		if (!document.body.classList.contains('max-1200')) {
			document.body.classList.add('max-1200');

			if (document.querySelector('.max-1200')) {
				if (bl4 && bl9) {
					bl4.prepend(bl9);
				}
				if (bl8 && bl9) {
					bl9.after(bl8);
				}
				if (bl6 && bl8) {
					bl8.after(bl6);
				}
				if (bl4 && bl6 && !bl8) {
					bl4.prepend(bl6);
				}

				if (bl6 && bl7) {
					bl6.after(bl7);
				}
				if (bl4 && bl5) {
					bl4.append(bl5);
				}
				if (
					document.querySelector('header .header__logo-company strong') &&
					document.querySelector('#top-content')
				) {
					content.style.marginLeft = '';
					content.style.opacity = '';
				}
				if (
					document.querySelector('header .header__logo-company') &&
					document.querySelector('.breadcrumbs') &&
					document.querySelector('.breadcrumbs + h1') &&
					!document.querySelector('.top-content') &&
					!document.querySelector('.product-details__content')
				) {
					list.style.marginLeft = '';
					list.style.opacity = '';

					mainTitle.style.marginLeft = '';
					mainTitle.style.opacity = '';
				}
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

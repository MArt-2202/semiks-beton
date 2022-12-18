export default function blockStyles() {
	if (document.querySelector('#top-section')) {
		document.body.classList.add('index-page');
	} else {
		document.body.classList.add('inner-page');
	}

	if (
		document.querySelector('header .logo-company strong') &&
		document.querySelector('#top-content')
	) {
		const title = document.querySelector('header .logo-company strong'),
			content = document.querySelector('#top-content');

		if (window.matchMedia('(min-width: 1201px)').matches) {
			content.style.marginLeft = `${title.offsetLeft + 16}px`;
			content.style.opacity = 1;
		}

		if (window.matchMedia('(max-width: 1200px)').matches) {
			content.style.marginLeft = '';
			content.style.opacity = '';
		}
	}

	if (document.querySelector('#order-form__quantity')) {
		document.querySelector('#order-form__quantity').addEventListener('input', function (e) {
			e.target.value = e.target.value.replace(/\D/g, '').substr(0, 10);
		});
	}

	if (document.querySelector('.map-wrapper')) {
		const observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.target.dataset.src) {
						entry.target.insertAdjacentHTML(
							'beforeend',
							`
									<iframe src="${entry.target.dataset.src}" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
								`
						);
						observer.unobserve(entry.target);
					}
				});
			},
			{
				rootMargin: '50px',
			}
		);
		document.querySelectorAll('.map-wrapper').forEach((item) => observer.observe(item));
	}

	if (document.querySelector('.video-wrapper')) {
		const observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.target.dataset.src) {
						entry.target.insertAdjacentHTML(
							'beforeend',
							`
									<iframe src="${entry.target.dataset.src}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
								`
						);
						observer.unobserve(entry.target);
					}
				});
			},
			{
				rootMargin: '50px',
			}
		);
		document.querySelectorAll('.video-wrapper').forEach((item) => observer.observe(item));
	}
}

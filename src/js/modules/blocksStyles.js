export default function blockStyles() {
	if (document.querySelector('header')) {
		document.querySelector('header').classList.add('init');
	}

	if (document.querySelector('#top-section')) {
		document.body.classList.add('index-page');
	} else {
		document.body.classList.add('inner-page');
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
					if (entry.isIntersecting && entry.target.dataset.youtube) {
						entry.target.insertAdjacentHTML(
							'beforeend',
							`
								<iframe src="${entry.target.dataset.youtube}" title="YouTube video player"
								allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen></iframe>
							`
						);
						observer.unobserve(entry.target);
					}
					if (
						entry.isIntersecting &&
						entry.target.dataset.video &&
						entry.target.dataset.poster &&
						entry.target.dataset.controls === 'yes'
					) {
						entry.target.insertAdjacentHTML(
							'beforeend',
							`
								<video controls muted playsinline poster="${entry.target.dataset.poster}">
									<source type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' src="${entry.target.dataset.video}">
								</video>
							`
						);
						observer.unobserve(entry.target);
					}
					if (
						entry.isIntersecting &&
						entry.target.dataset.video &&
						entry.target.dataset.poster &&
						entry.target.dataset.controls === 'no'
					) {
						entry.target.insertAdjacentHTML(
							'beforeend',
							`
								<video autoplay loop muted playsinline poster="${entry.target.dataset.poster}">
									<source type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' src="${entry.target.dataset.video}">
								</video>
							`
						);
						observer.unobserve(entry.target);
					}
					if (
						(entry.isIntersecting &&
							entry.target.dataset.video &&
							!entry.target.dataset.poster) ||
						entry.target.dataset.poster === ''
					) {
						entry.target.insertAdjacentHTML(
							'beforeend',
							`
								<video controls muted playsinline>
									<source type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' src="${entry.target.dataset.video}">
								</video>
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

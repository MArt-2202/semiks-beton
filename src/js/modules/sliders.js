import Swiper, { Pagination, Autoplay } from 'swiper';

export default function sliders() {
	if (
		document.querySelector('.reviews__slider') &&
		document.querySelector('.reviews__slider .swiper-wrapper')?.children.length
	) {
		new Swiper('.reviews__slider', {
			modules: [Pagination, Autoplay],
			on: {
				init() {
					if (document.querySelector('.reviews__slider-wrapper')) {
						document.querySelector('.reviews__slider-wrapper').classList.remove('style-3');
					}
				},
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
			},
			loop: true,
			slidesPerView: 2,
			spaceBetween: 30,
			forceToAxis: true,
			speed: 600,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			breakpoints: {
				1230: { spaceBetween: 30 },
				1024: { spaceBetween: 30 },
				768: { slidesPerView: 2, spaceBetween: 30 },
				576: { slidesPerView: 1, spaceBetween: 20 },
				415: { slidesPerView: 1, spaceBetween: 20 },
				360: { slidesPerView: 1, spaceBetween: 15 },
				300: { slidesPerView: 1, spaceBetween: 15 },
			},
		});
	} else if (document.querySelector('.reviews__slider-wrapper')) {
		document.querySelector('.reviews__slider-wrapper').classList.remove('style-3');
	}
}

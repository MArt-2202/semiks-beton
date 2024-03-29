'use strict';

import debounce from './modules/debounce';
import blocksStyles from './modules/blocksStyles';
import blocksStylesLoadResize from './modules/blocksStylesLoadResize';
import blockPosition from './modules/blockPosition';
import sliders from './modules/sliders';
import masketInput from './modules/masketInput';
import modal from './modules/modal';
import tableWrapper from './modules/tableWrapper';
import toggleContent from './modules/toggleContent';
import sendFormData from './modules/sendFormData';

if ('ontouchstart' in document.documentElement) {
	document.body.classList.add('touchdevice');
}

function isMobile(agent) {
	if (agent === void 0) agent = navigator.userAgent;

	return /Android|iPhone|iPad|iPod/i.test(agent);
}

if (isMobile()) {
	document.body.classList.remove('desktop-user-agent');
	document.body.classList.add('mobile-user-agent');
} else {
	document.body.classList.remove('mobile-user-agent');
	document.body.classList.add('desktop-user-agent');
}

document.addEventListener('DOMContentLoaded', () => {
	sliders();
	masketInput();
	modal();
	tableWrapper();
	toggleContent();
	sendFormData({
		formWrapper: '#price-form',
		formSubmitBtn: '#price-form__submit',
		dataAttr: '[data-key]',
		requiredSelector: '[required]',
		requiredClass: 'has-required',
		dataModal: 'modal-2',
	});
}); // END READY

window.addEventListener('resize', () => {
	debounce(function () {
		blocksStylesLoadResize();
		blockPosition();
	}, 200);
});

window.addEventListener('load', () => {
	debounce(function () {
		blocksStyles();
		blocksStylesLoadResize();
		blockPosition();
	}, 200);
});

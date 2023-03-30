export default function sendFormData({
	formWrapper,
	formSubmitBtn,
	dataAttr,
	requiredSelector,
	requiredClass,
	dataModal,
}) {
	if (document.querySelector(formWrapper)) {
		const form = document.querySelector(formWrapper),
			url = form.dataset?.action,
			sendData = {},
			formData = new FormData(),
			modal = document.querySelector(`[data-modal=${dataModal}]`);

		if (document.querySelector(formSubmitBtn)) {
			document.querySelector(formSubmitBtn).addEventListener('click', function (e) {
				if (requiredSelector && form.querySelector(requiredSelector)) {
					form.classList.add(requiredClass);
				}
			});
		}

		form.addEventListener('submit', function (e) {
			e.preventDefault();

			if (form.querySelector(dataAttr)) {
				form.querySelectorAll(dataAttr).forEach((el) => {
					const key = dataAttr.match(/[^data\-\[\]]/gi).join('');

					if (el.dataset[key] !== '') {
						sendData[el.dataset[key]] = el.value;
					}
				});
			}

			formData.append('json', JSON.stringify(sendData));

			// console.log(sendData, formData);

			fetch(url, {
				method: 'POST',
				body: formData,
				// headers: {
				// 	'Content-type': 'application/json; charset=UTF-8',
				// },
			})
				// .then((response) => response.json())
				.then((data) => {
					document.body.style.overflowY = '';
					document.body.style.paddingRight = '';

					if (modal) {
						modal.classList.remove('dn');
						modal.classList.add('show');
					}

					form.classList.remove('has-required');

					if (form.querySelector('input')) {
						form.querySelectorAll('input').forEach((el) => {
							if (el.type !== 'RADIO' || el.type !== 'CHECKBOX') {
								el.value = '';
							}
						});
					}
				})
				.catch((error) => {
					console.error(error?.message);
				});
		});
	}
}

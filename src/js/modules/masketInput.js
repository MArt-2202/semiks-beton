export default function masketInput() {
	if (document.querySelector('input[type=tel]')) {
		document.querySelectorAll('input[type=tel]').forEach((el) => {
			const element = el,
				maskOptions = {
					mask: '+{380}(00)000-00-00',
				};
			IMask(element, maskOptions);
		});
	}
}

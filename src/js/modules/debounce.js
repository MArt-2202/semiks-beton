// DEBOUNCE
let timeoutFn = null;
export default function debounce(fn, interval) {
	clearTimeout(timeoutFn);
	timeoutFn = setTimeout(fn, interval);
}

export function parse(value = '') {
	if (!value.startsWith('=')) {
		return value;
	}

	try {
		return eval(value.slice(1));
		// ???
		// return value;
	} catch (e) {
		console.error('Parsing error:', e.message);
	}
}

/* eslint-disable no-invalid-this */
export function keyDownHandler(key) {
	let event;

	switch (key) {
		case 'Enter':
			event = 'formula:enter';
			break;
	}

	return event;
}

export function formulaChangeHandler(changes) {
	const text = changes.currentText;

	if (text !== this.$formula.text()) {
		this.$formula.text(text);
	}
}

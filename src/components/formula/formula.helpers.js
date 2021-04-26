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

export function formulaChangeHandler($cell) {
	const cellText = $cell.text();
	this.$formula.text(cellText);
}

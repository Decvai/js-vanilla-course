import { $ } from '@core/dom';

export function shouldResize(event) {
	return !!event.target.dataset.resize;
}

export function isCell(event) {
	return !!(event.target.dataset.type === 'cell');
}

export function selectionHandler(selection, event) {
	const $target = $(event.target);

	if (event.shiftKey) {
		selection.selectGroup($target);
	} else {
		selection.select($target);
	}
}

export function splitId($el) {
	return $el.id.split(':').map(Number);
}

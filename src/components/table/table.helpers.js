/* eslint-disable no-invalid-this */
import { $ } from '@core/dom';

export function shouldResize(event) {
	return !!event.target.dataset.resize;
}

export function isCell(event) {
	return !!(event.target.dataset.type === 'cell');
}

export function selectionHandler(event) {
	const $target = $(event.target);

	if (event.shiftKey) {
		this.selection.selectGroup($target);
	} else {
		this.selection.select($target);
	}

	this.selectCell($target);
}

export function splitId($el) {
	return $el.id.split(':').map(Number);
}

export function keyDownHandler(event) {
	const keys = [
		'Enter',
		'Tab',
		'ArrowLeft',
		'ArrowRight',
		'ArrowDown',
		'ArrowUp',
	];

	const notPreventDefaultKeys = [
		'ArrowLeft',
		'ArrowRight',
		'ArrowDown',
		'ArrowUp',
		'ShiftEnter',
	];

	let { key } = event;

	if (!keys.includes(key)) return;
	if (event.shiftKey) {
		key = 'Shift' + key;
	}
	if (event.ctrlKey) {
		key = 'Ctrl' + key;
	}

	if (!notPreventDefaultKeys.includes(key)) {
		event.preventDefault();
	}

	const [currentRow, currentCol] = splitId(this.selection.$current);
	const $next = this.$root.find(nextSelector(key, currentRow, currentCol));

	if ($next) {
		this.selection.select($next);
		this.selectCell($next);
	}
}

export function inputHandler(event) {
	const text = $(event.target).text();
	this.updateTextInStore(text);
}

export function nextSelector(key, row, col) {
	switch (key) {
		case 'Enter':
		case 'CtrlArrowDown':
			row++;
			break;
		case 'Tab':
		case 'CtrlArrowRight':
			col++;
			break;
		case 'CtrlArrowLeft':
			col--;
			break;
		case 'CtrlArrowUp':
			row--;
			break;
		case 'ShiftTab':
			col--;
			break;
	}

	return `[data-id="${row}:${col}"]`;
}

import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '../../core/dom';
import { formulaChangeHandler, keyDownHandler } from './formula.helpers';

export class Formula extends ExcelComponent {
	static className = 'excel__formula';
	static tagName = 'div';

	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			subscribe: ['currentText'],
			...options,
		});
	}

	init() {
		super.init();

		this.$formula = this.$root.find('#formula');
	}

	storeChanged(changes) {
		formulaChangeHandler.call(this, changes);
	}

	toHTML() {
		return `
		<div class="info">
		fx
		</div>

		<div id="formula" class="input" contenteditable spellcheck="false"></div>
		`;
	}

	onInput(event) {
		const text = $(event.target).text() || '';
		this.$emit('formula:input', text);
	}

	onKeydown(event) {
		const keys = ['Enter', 'Tab'];

		const { key } = event;

		if (!keys.includes(key)) return;

		event.preventDefault();

		const emitterEvent = keyDownHandler(key);
		this.$emit(emitterEvent);
	}
}

import { $ } from '@core/dom';
import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { defaultStyles } from '../../constants';
import { createToolbar } from './toolbar.template';

export class Toolbar extends ExcelStateComponent {
	static className = 'excel__toolbar';
	static tagName = 'div';

	constructor($root, options) {
		super($root, {
			name: 'Toolbar',
			listeners: ['click'],
			subscribe: ['currentStyles'],
			...options,
		});
	}

	storeChanged({ currentStyles }) {
		this.setState(currentStyles);
	}

	prepare() {
		this.initState(defaultStyles);
	}

	get template() {
		return createToolbar(this.state);
	}

	toHTML() {
		return this.template;
	}

	onClick(event) {
		let $target = $(event.target);

		if ($target.data.type !== 'button') {
			$target = $target.closest('[data-type="button"]');
		}

		if (!$target) return;

		const value = JSON.parse($target.data.value);
		this.$emit('toolbar:applyStyle', value);
	}
}

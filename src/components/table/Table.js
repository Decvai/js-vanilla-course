import { ExcelComponent } from '@core/ExcelComponent';
import {
	inputHandler,
	isCell,
	keyDownHandler,
	selectionHandler,
	shouldResize,
} from './table.helpers';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
	static className = 'excel__table';
	static tagName = 'div';

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options,
		});
	}

	prepare() {
		this.selection = new TableSelection(this.$root);
	}

	init() {
		super.init();

		const $initialCell = this.$root.find('[data-id="0:0"]');
		this.selectCell($initialCell);

		this.$on('formula:input', text => {
			this.selection.$current.text(text);
		});
		this.$on('formula:enter', () => {
			this.selection.$current.focus({
				caretAtEnd: true,
			});
		});
	}

	selectCell($cell) {
		this.selection.select($cell);
		this.$emit('table:change', $cell);
	}

	toHTML() {
		return createTable(100);
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			resizeHandler.call(this, event);
		} else if (isCell(event)) {
			selectionHandler.call(this, event);
		}
	}

	onKeydown(event) {
		keyDownHandler.call(this, event);
	}

	onInput(event) {
		inputHandler.call(this, event);
	}
}

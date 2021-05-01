import { ExcelComponent } from '@core/ExcelComponent';
import { changeText, tableResize } from '../../redux/actions';
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
		this.selection.select($initialCell);
		this.selectCell($initialCell);

		this.$on('formula:input', text => {
			this.selection.$current.text(text);
			this.updateTextInStore(text);
		});
		this.$on('formula:enter', () => {
			this.selection.$current.focus({
				caretAtEnd: true,
			});
		});
	}

	selectCell($cell) {
		const text = $cell.text();
		this.$dispatch(
			changeText({
				id: this.selection.$current.id,
				text,
			})
		);
	}

	toHTML() {
		return createTable(100, this.$getState());
	}

	async resizeTable(event) {
		try {
			const data = await resizeHandler.call(this, event);
			this.$dispatch(tableResize(data));
		} catch (err) {
			console.warn('Resize error:', err);
		}
	}

	updateTextInStore(text) {
		this.$dispatch(
			changeText({
				id: this.selection.$current.id,
				text,
			})
		);
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			this.resizeTable(event);
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

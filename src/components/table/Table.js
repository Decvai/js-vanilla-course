import { ExcelComponent } from '@core/ExcelComponent';
import { parse } from '@core/parse';
import { defaultStyles } from '../../constants';
import { $ } from '@core/dom';
import {
	applyStyles,
	changeStyles,
	changeText,
	tableResize,
} from '../../redux/actions';
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

		this.$on('formula:input', value => {
			this.selection.$current
				.attr('data-value', value)
				.text(parse(value));

			this.updateTextInStore(value);
		});
		this.$on('formula:enter', () => {
			this.selection.$current.focus({
				caretAtEnd: true,
			});
		});
		this.$on('toolbar:applyStyle', value => {
			this.$dispatch(changeStyles(value));
			this.$dispatch(
				applyStyles({
					value,
					ids: this.selection.selectedIds,
				})
			);
			this.selection.applyStyle(value);

			this.selection.$current.focus({
				caretAtEnd: true,
			});
		});
	}

	selectCell($cell) {
		if ($.isEqual($cell, this.selection.$current)) {
			return;
		}

		this.selection.select($cell);

		const text = $cell.text();
		this.$dispatch(
			changeText({
				id: this.selection.$current.id,
				text,
			})
		);

		const styles = $cell.getStyles(Object.keys(defaultStyles));
		this.$dispatch(changeStyles(styles));
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

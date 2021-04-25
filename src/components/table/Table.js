import { ExcelComponent } from '@core/ExcelComponent';
import { isCell, selectionHandler, shouldResize } from './table.helpers';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
	static className = 'excel__table';
	static tagName = 'div';

	constructor($root) {
		super($root, {
			listeners: ['mousedown'],
		});
	}

	prepare() {
		this.selection = new TableSelection(this.$root);
	}

	init() {
		super.init();

		const $cell = this.$root.find('[data-id="0:0"]');
		this.selection.select($cell);
	}

	toHTML() {
		return createTable(100);
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			resizeHandler(this.$root, event);
		} else if (isCell(event)) {
			selectionHandler(this.selection, event);
		}
	}
}

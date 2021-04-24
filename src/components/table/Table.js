import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
// import { $ } from '@core/dom';ssssss
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.helpers';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
	static className = 'excel__table';
	static tagName = 'div';

	constructor($root) {
		super($root, {
			listeners: ['mousedown'],
		});
	}

	init() {
		super.init();

		this.selection = new TableSelection();
		const $cell = this.$root.find('[data-id="0:A"]');
		this.selection.select($cell);
	}

	toHTML() {
		return createTable(100);
	}

	onMousedown(event) {
		if (!shouldResize(event)) return;

		resizeHandler(this.$root, event);
	}
}

import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
	static className = 'excel__table';
	static tagName = 'div';

	constructor($root) {
		super($root, {
			listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
		});
	}

	toHTML() {
		return createTable(100);
	}

	onClick() {
		console.log('onClick');
	}

	onMousedown() {
		console.log('onMSD');
	}

	onMousemove() {
		console.log('onMouseMove');
	}

	onMouseup() {
		console.log('onMouseUP');
	}
}

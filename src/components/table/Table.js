import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
// import { $ } from '@core/dom';ssssss
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.helpers';

export class Table extends ExcelComponent {
	static className = 'excel__table';
	static tagName = 'div';

	constructor($root) {
		super($root, {
			// listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
			listeners: ['mousedown'],
		});
	}

	toHTML() {
		return createTable(100);
	}

	// onClick() {
	// 	console.log('onClick');
	// }

	onMousedown(event) {
		if (!shouldResize(event)) return;

		resizeHandler(this.$root, event);
	}

	// Onselectstart() {
	// 	return false;
	// }

	// onMousemove(event) {
	// 	// console.log(event);
	// 	// console.log(event);
	// }

	// onMouseup(event) {
	// 	// console.log(event.target);
	// 	// document.removeEventListener('mousemove', this.onMousemove);
	// }
}

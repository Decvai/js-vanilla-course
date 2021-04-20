import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { $ } from '@core/dom';

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
		if (!event.target.dataset.resize) return;
		document.body.onselectstart = () => false;

		const $resizer = $(event.target);
		const $parent = $resizer.closest('[data-type="resizable"]');
		const coords = $parent.getCoords();

		$resizer.style.opacity = 1;
		$resizer.style.height = '100vh';

		const colMetaData = $parent.data.col;
		const minDelta = -Math.abs(
			coords.width -
				Number.parseInt(getComputedStyle($parent.$el).minWidth)
		);

		const columns = event.currentTarget.querySelectorAll(
			`[data-col="${colMetaData}"]`
		);

		let delta;
		document.onmousemove = e => {
			delta = e.pageX - coords.right;

			if (delta > minDelta) {
				$resizer.style.right = -delta + 'px';
			}
			console.log(delta);
		};

		document.onmouseup = () => {
			if (delta) {
				columns.forEach(el => {
					el.style.width =
						coords.width +
						(delta > minDelta ? delta : minDelta) +
						'px';
				});
			}

			$resizer.style.height = '100%';
			$resizer.style.right = '0px';
			$resizer.style.opacity = 0;
			document.onmousemove = null;

			document.body.onselectstart = null;
		};
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

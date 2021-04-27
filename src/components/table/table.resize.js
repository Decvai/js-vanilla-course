/* eslint-disable no-invalid-this */
import { $ } from '@core/dom';

export function resizeHandler(event) {
	return new Promise(resolve => {
		document.body.onselectstart = () => false;

		const $resizer = $(event.target);
		const $parent = $resizer.closest('[data-type="resizable"]');
		const coords = $parent.getCoords();
		const type = $resizer.data.resize;

		let colMetaData;
		let minDelta;
		let column;
		let delta = 0;
		let value;

		$resizer.css({
			opacity: 1,
		});
		if (type === 'col') {
			$resizer.css({ height: '100vh' });

			colMetaData = $parent.data.col;
			minDelta = -Math.abs(
				coords.width - Number.parseInt($parent.computedStyle.minWidth)
			);

			column = this.$root.findAll(`[data-col="${colMetaData}"]`);
		} else {
			$resizer.css({ width: '100vw' });

			minDelta = -Math.abs(
				coords.height - Number.parseInt($parent.computedStyle.minHeight)
			);
		}

		document.onmousemove = e => {
			if (type === 'col') {
				delta = e.pageX - coords.right;
				if (delta > minDelta) {
					$resizer.css({
						right: -delta + 'px',
					});
				}
			} else {
				delta = e.pageY - coords.bottom;

				if (delta > minDelta) {
					$resizer.css({
						bottom: -delta + 'px',
					});
				}
			}
		};

		document.onmouseup = () => {
			if (type === 'col') {
				value = coords.width + (delta > minDelta ? delta : minDelta);

				column.forEach(cell => {
					cell.css({
						width: value + 'px',
					});
				});

				$resizer.css({
					height: '100%',
					right: '0px',
				});
			} else {
				value = coords.height + (delta > minDelta ? delta : minDelta);

				$parent.css({
					height: value + 'px',
				});

				$resizer.css({
					width: '100%',
					bottom: '0px',
				});
			}

			resolve({
				[$parent.data[type]]: value,
			});

			$resizer.css({
				opacity: 0,
			});

			document.onmousemove = null;
			document.onmouseup = null;
			document.body.onselectstart = null;
		};
	});
}

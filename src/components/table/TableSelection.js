import { splitId } from './table.helpers';

export class TableSelection {
	#className = 'selected';

	constructor($root) {
		this.group = [];
		this.$current = null;
		this.$root = $root;
	}

	select($el) {
		this.unselect();
		this.$current = $el;
		this.group.push($el);
		$el.addClass(this.#className);
	}

	selectGroup($targetEl) {
		this.unselect();
		const $currentEl = this.$current;

		let [startRow, startCol] = splitId($currentEl);
		let [endRow, endCol] = splitId($targetEl);

		if (startRow > endRow) {
			[startRow, endRow] = [endRow, startRow];
		}
		if (startCol > endCol) {
			[startCol, endCol] = [endCol, startCol];
		}

		for (let i = startRow; i <= endRow; i++) {
			for (let j = startCol; j <= endCol; j++) {
				const selector = `[data-id="${i}:${j}"]`;
				const $el = this.$root.find(selector);
				this.group.push($el);
				$el.addClass(this.#className);
			}
		}
	}

	unselect() {
		this.group.forEach($el => $el.removeClass(this.#className));
		this.group = [];
	}
}

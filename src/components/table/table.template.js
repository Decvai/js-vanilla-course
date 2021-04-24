const CODES = {
	A: 65,
	Z: 90,
};

function createCell(col, row) {
	return `
		<div contenteditable class="cell" data-col="${col}" data-id="${row}:${col}">
		</div>
	`;
}

function toColumn(col) {
	return `
		<div class="column" data-type="resizable" data-col="${col}">
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`;
}

function createRow(content, info = '') {
	const resize = info
		? '<div class="row-resize" data-resize="row"></div>'
		: '';

	return `
		<div class="row" data-type="resizable">
			<div class="row-info">
				${info}
				${resize}
			</div>
			<div class="row-data">${content}</div>
		</div>
	`;
}

function toChar(index) {
	return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];
	const cols = new Array(colsCount)
		.fill('')
		.map((_, index) => {
			const char = toChar(index);
			return toColumn(char);
		})
		.join('');

	rows.push(createRow(cols));

	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			.map((_, index) => {
				const char = toChar(index);
				return createCell(char, row);
			})
			.join('');
		rows.push(createRow(cells, row + 1));
	}

	return rows.join('');
}

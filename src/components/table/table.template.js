const CODES = {
	A: 65,
	Z: 90,
};

function createCell() {
	return `
		<div contenteditable class="cell"></div>
	`;
}

function toColumn(col) {
	return `
		<div class="column">${col}</div>
	`;
}
toColumn;
function createRow(content, info = '') {
	return `
		<div class="row">
			<div class="row-info">${info}</div>
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

	for (let i = 0; i < rowsCount; i++) {
		const cells = new Array(colsCount).fill('').map(createCell).join('');
		rows.push(createRow(cells, i + 1));
	}

	return rows.join('');
}

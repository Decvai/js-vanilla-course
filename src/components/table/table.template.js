const CODES = {
	A: 65,
	Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
	return state?.colState[index] || DEFAULT_WIDTH;
}

function getHeight(state, index) {
	return state?.rowState[index] || DEFAULT_HEIGHT;
}

function getText(state, id) {
	return state?.dataState[id] || '';
}

function toChar(index) {
	return String.fromCharCode(CODES.A + index);
}

function createCell(state, row) {
	return (_, col) => {
		const width = getWidth(state, col);
		const id = `${row}:${col}`;

		return `
			<div
			contenteditable
			class="cell"
			style="width: ${width}px"
			data-col="${col}"
			data-id="${id}"
			data-type="cell"
			>
			${getText(state, id)}
			</div>
		`;
	};
}

function createColumn(state) {
	return (_, col) => {
		const char = toChar(col);
		const width = getWidth(state, col);

		return `
			<div
			class="column" 
			style="width: ${width}px"
			data-type="resizable" 
			data-col="${col}"
			>
				${char}
				<div class="col-resize" data-resize="col"></div>
			</div>
		`;
	};
}

function createRow(state, content, info = '') {
	const resize = info
		? '<div class="row-resize" data-resize="row"></div>'
		: '';

	return `
		<div
		class="row"
		data-type="resizable"
		data-row="${info}"
		style="height:${getHeight(state, info)}px"
		>
			<div class="row-info">
				${info}
				${resize}
			</div>
			<div class="row-data">${content}</div>
		</div>
	`;
}

export function createTable(rowsCount = 15, state) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];
	const cols = new Array(colsCount)
		.fill('')
		.map(createColumn(state))
		.join('');

	rows.push(createRow(state, cols));

	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(createCell(state, row))
			.join('');
		rows.push(createRow(state, cells, row + 1));
	}

	return rows.join('');
}

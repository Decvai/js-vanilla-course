export function capitalize(str) {
	if (typeof str !== 'string') {
		return '';
	}

	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function pasteHtmlAtCaret(html) {
	let sel;
	let range;
	if (window.getSelection) {
		// IE9 and non-IE
		sel = window.getSelection();
		if (sel.getRangeAt && sel.rangeCount) {
			range = sel.getRangeAt(0);
			range.deleteContents();

			// Range.createContextualFragment() would be useful here but is
			// non-standard and not supported in all browsers (IE9, for one)
			const el = document.createElement('div');
			el.innerHTML = html;
			const frag = document.createDocumentFragment();
			let node;
			let lastNode;

			while ((node = el.firstChild)) {
				lastNode = frag.appendChild(node);
			}
			range.insertNode(frag);

			// Preserve the selection
			if (lastNode) {
				range = range.cloneRange();
				range.setStartAfter(lastNode);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	} else if (document.selection && document.selection.type != 'Control') {
		// IE < 9
		document.selection.createRange().pasteHTML(html);
	}
}

export function storage(key, data = null) {
	if (!data) {
		const initialState = {
			colState: {},
			rowState: {},
		};
		return JSON.parse(localStorage.getItem(key)) || initialState;
	}

	localStorage.setItem(key, JSON.stringify(data));
}

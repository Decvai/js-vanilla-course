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
		return JSON.parse(localStorage.getItem(key));
	}

	localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(obj1, obj2) {
	if (obj1 === obj2) {
		return true;
	}

	if (isPrimitive(obj1) && isPrimitive(obj2)) {
		return obj1 === obj2;
	}

	if (!obj1 || !obj2) {
		return obj1 === obj2;
	}

	if (Object.keys(obj1).length !== Object.keys(obj2).length) {
		return false;
	}

	for (const key in obj1) {
		if (Object.hasOwnProperty.call(obj1, key)) {
			if (!(key in obj2)) {
				return false;
			}

			if (!isEqual(obj1[key], obj2[key])) {
				return false;
			}
		}
	}

	return true;
}

export function isPrimitive(obj) {
	return obj !== Object(obj);
}

export function camelToDashCase(s) {
	return s.replace(/[A-Z]/g, '-$&').toLowerCase();
}

export function debounce(fn, ms) {
	let timeout;

	return function (...args) {
		const later = () => {
			clearTimeout(timeout);
			// eslint-disable-next-line no-invalid-this
			fn.apply(this, args);
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, ms);
	};
}

export function preventDefault(event) {
	event.preventDefault();
}

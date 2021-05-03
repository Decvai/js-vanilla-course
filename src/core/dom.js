import { pasteHtmlAtCaret } from './utils';

class Dom {
	constructor(selector) {
		this.$el =
			typeof selector === 'string'
				? document.querySelector(selector)
				: selector;
	}

	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this;
		}
		return this.$el.outerHTML.trim();
	}

	text(text) {
		if (typeof text !== 'undefined') {
			this.$el.innerText = text;
			return this;
		}
		if (this.$el.tagName.toLowerCase() === 'input') {
			return this.$el.value.trim();
		}
		return this.$el.innerText.trim();
	}

	clear() {
		this.html();
		return this;
	}

	append(node) {
		if (node instanceof Dom) {
			node = node.$el;
		}

		if (Element.prototype.append) {
			this.$el.append(node);
		} else {
			this.$el.appendChild(node);
		}

		return this;
	}

	get data() {
		return this.$el.dataset;
	}

	css(styles = {}) {
		for (const param in styles) {
			if (Object.prototype.hasOwnProperty.call(styles, param)) {
				this.$el.style[param] = styles[param];
			}
		}
	}

	focus(options = {}) {
		this.$el.focus();

		if (options.caretAtEnd) {
			const text = this.text();
			this.text('');
			pasteHtmlAtCaret(text);
		}

		return this;
	}

	get id() {
		return this.data.id;
	}

	attr(name, value) {
		if (typeof value === 'string') {
			this.$el.setAttribute(name, value);
			return this;
		}

		return this.$el.getAttribute(name);
	}

	find(selector) {
		return $(this.$el.querySelector(selector));
	}

	addClass(className) {
		this.$el.classList.add(className);
		return this;
	}

	removeClass(className) {
		this.$el.classList.remove(className);
		return this;
	}

	toggleClass(className) {
		this.$el.classList.toggle(className);
		return this;
	}

	forEach(callback) {
		this.$el.forEach((el, index, array) => {
			const domEl = $(el);

			callback(domEl, index, array);
		});
	}

	findAll(selector) {
		return $(this.$el.querySelectorAll(selector));
	}

	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback);
		return this;
	}

	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback);
		return this;
	}

	closest(selector) {
		return $(this.$el.closest(selector));
	}

	getCoords() {
		return this.$el.getBoundingClientRect();
	}

	get computedStyle() {
		return getComputedStyle(this.$el);
	}

	getStyles(styles = []) {
		return styles.reduce((res, s) => {
			res[s] = this.$el.style[s];
			return res;
		}, {});
	}
}

export function $(selector) {
	const dom = new Dom(selector);

	if (!dom.$el) return;
	return dom;
}

$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName);
	if (classes) {
		el.classList.add(classes);
	}
	return $(el);
};

$.isEqual = ($el1, $el2) => $el1?.$el === $el2?.$el;

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

	find(selector) {
		return $(this.$el.querySelector(selector));
	}

	addClass(className) {
		this.$el.classList.add(className);
	}

	removeClass(className) {
		this.$el.classList.remove(className);
	}

	toggleClass(className) {
		this.$el.classList.toggle(className);
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
	}

	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback);
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
}

export function $(selector) {
	return new Dom(selector);
}

$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName);
	if (classes) {
		el.classList.add(classes);
	}
	return $(el);
};

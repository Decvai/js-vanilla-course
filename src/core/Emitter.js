export class Emitter {
	constructor() {
		this.listeners = {};
	}

	// dispatch, fire, trigger
	emit(event, ...args) {
		if (!Array.isArray(this.listeners[event])) return false;

		this.listeners[event].forEach(listener => {
			listener(...args);
		});

		return true;
	}

	subscribe(event, fn) {
		if (!event) return;

		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(fn);

		return () => {
			this.listeners[event] = this.listeners[event].filter(
				listener => listener !== fn
			);
		};
	}
}

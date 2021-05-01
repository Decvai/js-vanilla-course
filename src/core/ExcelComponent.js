import { DOMListener } from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.emitter = options.emitter;
		this.subscribe = options.subscribe || [];
		this.unsubscribers = [];
		this.store = options.store;

		this.prepare();
	}

	storeChanged(changes) {
		console.log('CHANGES:', this.name, changes);
	}

	isWatching(key) {
		return this.subscribe.includes(key);
	}

	$emit(event, ...args) {
		this.emitter.emit(event, ...args);
	}

	$dispatch(action) {
		this.store.dispatch(action);
	}

	$getState() {
		return this.store.getState();
	}

	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn);
		this.unsubscribers.push(unsub);
	}

	prepare() {}

	toHTML() {
		return '';
	}

	init() {
		this.initDOMListeners();
	}

	destroy() {
		this.removeDOMListeners();
		this.unsubscribers.forEach(unsub => unsub());
	}
}

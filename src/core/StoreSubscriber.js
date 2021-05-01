import { isEqual } from './utils';

export class StoreSubscriber {
	constructor(store) {
		this.store = store;
		this.sub = null;
		this.prevState = {};
	}

	subscribeComponents(components) {
		this.prevState = {};

		this.sub = this.store.subscribe(state => {
			Object.keys(state).forEach(key => {
				if (isEqual(this.prevState[key], state[key])) return;

				components.forEach(component => {
					if (!component.isWatching(key)) return;

					const changes = {
						[key]: state[key],
					};
					component.storeChanged(changes);
				});
			});

			this.prevState = state;
		});
	}

	unsubscribeFromStore() {
		this.sub.unsubscribe();
	}
}

import { CHANGE_TEXT, TABLE_RESIZE } from './types';

export function rootReducer(state, action) {
	let field;

	console.log('action.type:', action.type);
	switch (action.type) {
		case TABLE_RESIZE:
			field = action.payload.type === 'col' ? 'colState' : 'rowState';
			return {
				...state,
				[field]: { ...state[field], ...action.payload.size },
			};
		case CHANGE_TEXT:
			return {
				...state,
				currentText: action.payload.text,
				dataState: {
					...state.dataState,
					...(action.payload.text && {
						[action.payload.id]: action.payload.text,
					}),
				},
			};
		default:
			return state;
	}
}

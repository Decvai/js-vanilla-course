import { defaultStyles } from '../constants';

const defaultState = {
	colState: {},
	rowState: {},
	dataState: {},
	stylesState: {},
	currentText: '',
	title: 'New table',
	currentStyles: defaultStyles,
};

export function normalizeInitialState(state) {
	return state ? state : defaultState;
}

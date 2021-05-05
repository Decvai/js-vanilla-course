import { defaultStyles } from '../constants';

const defaultState = {
	colState: {},
	rowState: {},
	dataState: {},
	stylesState: {},
	currentText: '',
	title: 'New table',
	date: new Date().toJSON(),
	currentStyles: defaultStyles,
};

export function normalizeInitialState(state) {
	return state ? state : defaultState;
}

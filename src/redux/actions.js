import { CHANGE_TEXT, TABLE_RESIZE } from './types';

export function tableResize(data) {
	return {
		type: TABLE_RESIZE,
		payload: data,
	};
}

export function changeText(data) {
	return {
		type: CHANGE_TEXT,
		payload: data,
	};
}

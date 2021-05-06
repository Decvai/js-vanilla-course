import {
	APPLY_STYLE,
	CHANGE_DATE,
	CHANGE_STYLES,
	CHANGE_TEXT,
	CHANGE_TITLE,
	TABLE_RESIZE,
} from './types';

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

export function changeStyles(styles) {
	return {
		type: CHANGE_STYLES,
		payload: styles,
	};
}

export function applyStyles(data) {
	return {
		type: APPLY_STYLE,
		payload: data,
	};
}

export function changeTitle(title) {
	return {
		type: CHANGE_TITLE,
		payload: title,
	};
}

export function changeDate() {
	return {
		type: CHANGE_DATE,
	};
}

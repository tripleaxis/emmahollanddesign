import * as ActionTypes from './action-types';

const DEFAULT_STATE = [];

export function reducer(state = DEFAULT_STATE, {type, payload}) {
	switch(type) {
		case ActionTypes.INIT_ITEMS:
			return payload;
		
		default:
			return state;
	}
}

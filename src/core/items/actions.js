import * as ActionTypes from './action-types';

export function initItems(items) {
	return {
		type: ActionTypes.INIT_ITEMS,
		payload: items
	};
}

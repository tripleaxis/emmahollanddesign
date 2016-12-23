import * as ActionTypes from './action-types';

export function initAuth(user) {
	return {
		type: ActionTypes.INIT_AUTH,
		payload: user
	};
}

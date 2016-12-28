import { ActionTypes } from './actions';

const DEFAULT_USER = {
	loaded: false,
	authenticated: false
};

// Handle Auth actions
export const reducer = (state = DEFAULT_USER, { type, payload }) => {
	switch (type) {
		case ActionTypes.UPDATE:
			let { uid, displayName, email } = payload;
			return Object.assign(
				{}, DEFAULT_USER, state, {
					authenticated: Object.keys(payload).length > 0,
					loaded: true,
					id: uid,
					displayName,
					email
				}
			);
		default:
			return state;
	}
};

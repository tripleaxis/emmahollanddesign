import * as ActionTypes from './action-types';

const DEFAULT_USER = {
	loaded: false,
	authenticated: false
};

// Setup new user
function newUser (state, payload) {
	let { uid, displayName, email } = payload;
	return Object.assign(
		DEFAULT_USER, state, {
			authenticated: Object.keys(payload).length > 0,
			loaded: true,
			id: uid,
			displayName,
			email
		}
	);
}

// Handle Auth actions
export const reducer = (state = DEFAULT_USER, { type, payload }) => {
	switch (type) {
		case ActionTypes.INIT_AUTH:
		case ActionTypes.SIGN_IN_SUCCESS:
			return newUser(state, payload);
		
		case ActionTypes.SIGN_OUT_SUCCESS:
			return Object.assign({}, DEFAULT_USER, {
				loaded: true
			});
		
		default:
			return state;
	}
};

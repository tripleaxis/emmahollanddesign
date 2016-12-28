export const ActionTypes = {
	UPDATE: 'Auth::Update'
};

export const updateAuth = (user) => {
	return {
		type: ActionTypes.UPDATE,
		payload: user
	}
};

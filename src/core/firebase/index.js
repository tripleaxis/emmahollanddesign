import firebase from 'firebase';
import config from './config';
import { ActionTypes } from '../data'

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

export const query = (path) => {
	return new Promise((resolve, reject) => {
		database.ref(path)
			.once('value', (response) => {
				resolve(response.val());
			})
			.catch((err) => {
				throw err.message;
			});
	});
};

/** Hook for redux to update firebase database on change */
export const updateDatabase = ({ getState }) => {
	return (next) => (action) => {
		const state = next(action);
		
		switch (state.action.type) {
			case ActionTypes.Items.UPDATE:
				let newState = getState();
				let newItem = state.action.payload;
				let idx = newState.computedStates.slice(-1).pop().state.items
					.findIndex((item) => item.id === newItem.id);
				if (idx === -1) return;
				
				console.log(`FireBase::UpdateItem: artwork/items/${idx} (${newItem.title})`);
				
				database.ref().update({
					[`artwork/items/${idx}`]: newItem
				})
					.then(() => {
						console.log('update complete');
						//ToDo: Dispatch 'Saved' notification here
					});
				break;
			
			default:
				break;
		}
		
		return state;
	};
};

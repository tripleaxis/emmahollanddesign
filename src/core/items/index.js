import { database } from '../firebase';
import store from '../store';
import * as ItemActions from './actions';
import * as ActionTypes from './action-types';

export { reducer as itemReducer } from './reducer';
export { ActionTypes };

// initial data request for items
export function fetchItems (dispatch) {
	return new Promise((resolve, reject) => {
		database.ref('items')
			.once('value', function (response) {
				let items = response.val();
				console.log('fetchItems::resolved', items);
				store.dispatch(ItemActions.initItems(items));
				resolve();
			});
	});
}

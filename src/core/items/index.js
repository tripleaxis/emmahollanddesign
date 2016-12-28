import { query } from '../firebase';
import store from '../store';
import * as ItemActions from './actions';
import * as ActionTypes from './action-types';

export { reducer as itemReducer } from './reducer';
export { ActionTypes };

// initial data request for items
export function fetchItems (dispatch) {
	return query('artwork')
		.then((artwork) => {
			console.log('fetchItems::resolved', artwork);
			store.dispatch(ItemActions.initItems(artwork.items));
		});
}

import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { itemReducer } from './items';

export default combineReducers({
	user: authReducer,
	items: itemReducer
});

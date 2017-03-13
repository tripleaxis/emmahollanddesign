import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { itemReducer } from './data';
import { tagReducer } from './data';

export default combineReducers({
  user: authReducer,
  items: itemReducer,
  tags: tagReducer
});

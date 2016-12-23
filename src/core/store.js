import { createStore } from 'redux';
import reducers from './reducers';

// Define data store
const store = createStore(
	reducers, {}, window.devToolsExtension && window.devToolsExtension()
);

export default store;

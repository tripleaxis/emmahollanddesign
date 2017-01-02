import { compose, createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { saveLocalCache, getCache } from './cache';
import { updateDatabase } from './firebase';

const initialState = getCache();

// Setup redux middleware to add devTools profiling and localStorage caching
let enhancer = compose(
	window.devToolsExtension && window.devToolsExtension(),
	applyMiddleware(saveLocalCache),
	applyMiddleware(updateDatabase)
);

// Define data store
const store = createStore(reducers, initialState, enhancer);

export default store;

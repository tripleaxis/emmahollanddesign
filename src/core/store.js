import { compose, createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { reduxEnhancer, getCache } from './cache';

const initialState = getCache();

// Setup redux middleware to add devTools profiling and localStorage caching
let enhancer = compose(
	window.devToolsExtension && window.devToolsExtension(),
	applyMiddleware(reduxEnhancer)
);

// Define data store
const store = createStore(reducers, initialState, enhancer);

export default store;

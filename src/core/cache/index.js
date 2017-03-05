import { ActionTypes } from '../data';

const KEY = 'local-data';
const LIFESPAN = 1000 * 60 * 30;
let cache;

/**
 * Check if local cached data has expired
 */
const hasExpired = (data) => {
	return Date.now() > data.expiry;
};

/**
 * Test if localStorage is supported on current device
 */
export const isSupported = (() => {
	let key = '__test__';
	try {
		localStorage.setItem(key, 'ok');
		let val = localStorage.getItem(key);
		localStorage.removeItem(key);
		return val === 'ok';
	} catch (err) {
		return false;
	}
})();

/**
 * Retrieve all cached data
 */
export const getCache = () => {
	if (!cache) {
		try {
			cache = JSON.parse(localStorage.getItem(KEY));
		} catch (err) {
		}
	}
	
	// check cache hasn't expired
	if(hasExpired(cache || {})) {
		cache = {};
	}
	
	// return cache without expiry prop
	let tmp = Object.assign({}, cache);
	delete tmp.expiry;
	
	return tmp;
};

/**
 * Add data to cache
 */
export const setCache = (name, data) => {
	if (!isSupported) return false;
	let cache = getCache();
	cache.expiry = Date.now() + LIFESPAN;
	cache[name] = data;
	try {
		localStorage.setItem(KEY, JSON.stringify(cache));
		return true;
	} catch (err) {
		return false;
	}
};

/**
 * Hook for redux to drop specific data to local-cache
 */
export const saveLocalCache = ({ getState }) => {
	return (next) => (action) => {
		const state = next(action);
		
		if (isSupported) {
			let newState = getState().computedStates.slice(-1).pop().state;
			
			switch (state.action.type) {
				case ActionTypes.Items.INIT:
				case ActionTypes.Items.ADD:
				case ActionTypes.Items.UPDATE:
					setCache('items', newState.items);
					break;
					
				case ActionTypes.Tags.INIT:
				case ActionTypes.Tags.ADD:
					setCache('tags', newState.tags);
					break;
				
				default:
					break;
			}
		}
		
		return state;
	};
};

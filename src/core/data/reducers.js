import { ActionTypes } from './actions';

const DEFAULT_ITEMS = [];
const DEFAULT_TAGS = [];

/**
 * Reducer for Artwork Items
 */
export function itemReducer (state = DEFAULT_ITEMS, { type, payload }) {
	switch (type) {
		case ActionTypes.Items.INIT:
			return payload;
		
		case ActionTypes.Items.UPDATE:
			// only update if item exists in collection
			let idx = state.findIndex((item) => item.id === payload.id);
			if (idx === -1) {
				return state;
			}
			
			// replace item in array and return new state
			let newState = state.slice();
			newState[idx] = Object.assign({}, payload);
			return newState;
		
		case ActionTypes.Items.ADD:
			// only update if new item's id is unique
			if (state.some((item) => item.id === payload.id)) {
				return state;
			}
			
			// add new item and return state
			return state.concat(payload);
		
		default:
			return state;
	}
}

/**
 * Reducer for Tags
 */
export function tagReducer (state = DEFAULT_TAGS, { type, payload }) {
	switch (type) {
		case ActionTypes.Tags.INIT:
			return payload;
		
		case ActionTypes.Tags.ADD:
			let newState = state.slice();
			
			// only add if not already in collection
			if (newState.includes(payload)) {
				newState.push(payload);
			}
			return newState;
		
		default:
			return state;
	}
}

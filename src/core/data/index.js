import { query } from '../firebase';
import store from '../store';
import * as Actions from './actions';

export { itemReducer, tagReducer } from './reducers';
export const ActionTypes = Actions.ActionTypes;

// initial data requests
function fetchArtwork() {
  return query('artwork')
    .then((artwork) => {
      console.log('fetchArtwork::resolved', artwork);
      store.dispatch(Actions.initItems(artwork.items));
    });
}

function fetchTags() {
  return query('tags')
    .then((tags) => {
      console.log('fetchTags::resolved', tags);
      store.dispatch(Actions.initTags(tags));
    });
}

// Wrap all initial data requests in Promise.all
export function fetchInitialData() {
  return Promise.all([
    fetchArtwork(),
    fetchTags()
  ]);
}

import firebase from 'firebase';
import config from './config';
import { ActionTypes } from '../data'

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

export const query = (path) => {
  return new Promise((resolve) => {
    database.ref(path)
      .once('value', (response) => {
        resolve(response.val());
      })
      .catch((err) => {
        throw err.message;
      });
  });
};

export const update = (path, data) => {
  database.ref().update({ [path]: data })
    .then(() => {
      console.log('database update complete');
      //ToDo: Dispatch 'Saved' notification here
    });
};

function getItems(state) {
  return state.computedStates.slice(-1).pop().state.items;
}

/** Hook for redux to update firebase database on change */
export const updateDatabase = ({ getState }) => {
  return (next) => (action) => {
    const state = next(action);
    let newState = getState();
    let newItem, idx, items;
    
    switch (state.action.type) {
      case ActionTypes.Items.UPDATE:
        items = getItems(newState);
        newItem = state.action.payload;
        idx = items.findIndex((item) => item.id === newItem.id);
        if (idx === -1) return;
        
        console.log(`FireBase::${state.action.type}: artwork/items/${idx} (${newItem.title})`);
        update(`artwork/items/${idx}`, newItem);
        break;
      
      case ActionTypes.Items.ADD:
        items = getItems(newState);
        newItem = state.action.payload;
        if (items.some((item) => item.id === newItem.id)) {
          break;
        }
        
        console.log(`FireBase::${state.action.type}: artwork/items/${newItem.id} (${newItem.title})`);
        update(`artwork/items/${items.length}`, newItem);
        break;
      
      case ActionTypes.Tags.ADD:
        break;
      
      default:
        break;
    }
    
    return state;
  };
};

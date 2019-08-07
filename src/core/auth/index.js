import { auth, GoogleAuthProvider } from '../firebase';
import store from '../store';
import * as Actions from './actions';

// Export short-cut refs
export { reducer as authReducer } from './reducer';

// Firebase authentication state handler
auth.onAuthStateChanged((user) => {
  console.log('onAuthStateChanged()', 'logged in:', !!user);
  store.dispatch(Actions.updateAuth(user || {}));
});

export function signInWithGoogle() {
  let provider = new GoogleAuthProvider();
  provider.addScope('email');
  
  return auth.signInWithPopup(provider);
}

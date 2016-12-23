import { auth, GoogleAuthProvider } from '../firebase';
import store from '../store';
import * as AuthActions from './actions';
import * as ActionTypes from './action-types';

// Export short-cut refs
export { reducer as authReducer } from './reducer';
export { ActionTypes };

// Initial firebase authentication state
export function initAuth () {
	return new Promise((resolve, reject) => {
		auth.onAuthStateChanged(
			(user) => {
				console.log('initAuth::resolved', 'logged in:', !!user, user);
				store.dispatch(AuthActions.initAuth(user || {}));
				resolve();
			},
			(err) => reject(err)
		);
	});
}

export function signInWithGoogle () {
	let provider = new GoogleAuthProvider();
	provider.addScope('profile');
	provider.addScope('email');
	
	return auth.signInWithPopup(provider);
}

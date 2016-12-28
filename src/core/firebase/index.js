import firebase from 'firebase';
import config from './config';

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

export const query = (path) => {
	return new Promise((resolve, reject) => {
		database.ref(path)
			.once('value', (response) => {
				resolve(response.val());
			})
			.catch((err) => {
				throw err.message;
			});
	});
};

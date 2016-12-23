import firebase from 'firebase';
import config from './config';

export const app = firebase.initializeApp(config);
export const database = firebase.database();
export const auth = firebase.auth();
export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

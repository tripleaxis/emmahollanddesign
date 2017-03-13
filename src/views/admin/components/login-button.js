import React from 'react';
import { signInWithGoogle } from '../../../core/auth';
import './login-button.less';

export default function LoginButton () {
	return <button id="loginButton" onClick={signInWithGoogle}>Login with Google</button>;
}

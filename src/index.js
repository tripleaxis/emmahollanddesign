// PolyFills
import 'babel-polyfill'
import 'whatwg-fetch';

import App from './app';
import './index.css';

App.run(
	document.querySelector('#app')
);

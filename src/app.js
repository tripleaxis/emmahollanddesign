import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './core/store';

// Initialisation
import { fetchInitialData } from './core/data';
import { getCache } from './core/cache';

// Views:
import HoldingView from './views/holding';
import HomeView from './views/home';
import ImageView from './views/image';
import AdminView from './views/admin';


function render(mountPoint) {
	ReactDOM.render(
		<Provider store={store}>
			<Router history={hashHistory}>
				<Route path="/" component={HoldingView}/>
				<Route path="/home" component={HomeView}/>
				<Route path="/image/:image" component={ImageView}/>
				<Route path="/admin" component={AdminView}/>
			</Router>
		</Provider>,
		mountPoint
	);
}

export default {
	run: (el) => {
		console.log('initialItems:', store.getState().items);
		
		const cache = getCache();
		if (!cache.items || !cache.tags) {
			fetchInitialData();
		}
		
		render(el);
	}
}

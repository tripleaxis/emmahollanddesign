import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './core/store';

// Initialisation
import { fetchItems } from './core/items';
import { getCache } from './core/cache';

// Views:
import HomeView from './views/home';
import ImageView from './views/image';
import AdminView from './views/admin';

function render (mountPoint) {
	ReactDOM.render(
		<Provider store={store}>
			<Router history={hashHistory}>
				<Route path="/" component={HomeView}>
					<Route path="/image/:image" component={ImageView}/>
				</Route>
				<Route path="/admin" component={AdminView}/>
			</Router>
		</Provider>,
		mountPoint
	);
}

export default {
	run: (el) => {
		console.log('initialItems:', store.getState().items);
		
		if (!getCache().items) {
			fetchItems();
		}
		
		render(el);
	}
}

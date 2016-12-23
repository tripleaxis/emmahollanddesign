import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './core/store';

// Initialisation
import { initAuth } from './core/auth';
import { fetchItems } from './core/items';

// Views:
import HomeView from './views/home';
import ImageView from './views/image';

function render (mountPoint) {
	ReactDOM.render(
		<Provider store={store}>
			<Router history={hashHistory}>
				<Route path="/" component={HomeView}>
					<Route path="/image/:image" component={ImageView}/>
				</Route>
			</Router>
		</Provider>,
		mountPoint
	);
}

export default {
	run: (el) => {
		Promise.all([
			initAuth(),
			fetchItems()
		]);
		
		render(el);
	}
}

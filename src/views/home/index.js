import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginButton from './login-button';
import ItemList from '../items/itemList';
import './Home.css';

class Home extends Component {
	
	getUserControl () {
		if(!this.props.user.loaded) {
			return false;
		}
		
		return this.props.user.authenticated ?
			<LoginButton/> :
			<div><p>{this.props.user.displayName}</p></div>;
	}
	
	render () {
		let { items } = this.props;
		
		return (
			<div className="Home">
				{ this.getUserControl() }
				<ItemList items={items}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return Object.assign({}, state);
};

export default connect(mapStateToProps)(Home);

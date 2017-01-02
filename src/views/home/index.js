import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ItemList from '../items/itemList';
import './Home.css';

class Home extends Component {
	
	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.object).isRequired
	};
	
	render () {
		let { items } = this.props;
		
		return (
			<div className="Home">
				<h1>Artwork</h1>
				<ItemList items={items}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { items } = state;
	return { items };
};

export default connect(mapStateToProps)(Home);

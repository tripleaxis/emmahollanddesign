import React, { Component, PropTypes } from 'react';

import AdminItemList from './components/admin-item-list';

export default class Authenticated extends Component {
	
	static propTypes = {
		user: PropTypes.object.isRequired,
		items: PropTypes.arrayOf(PropTypes.object).isRequired,
		tags: PropTypes.arrayOf(PropTypes.string)
	};
	
	state = {
		filter: ''
	};
	
	onFilterChanged = () => {
		this.setState({
			filter: this.filterInput.value
		});
	};
	
	addItem = () => {
		alert('add new item');
	};
	
	render () {
		return (
			<section className="authenticated">
				<div className="filter-section">
					<label htmlFor="itemFilter">Filter Items: </label>
					<input type="text" id="itemFilter" onChange={this.onFilterChanged}
					       ref={(input) => this.filterInput = input }/>
				</div>
				<button className="green" onClick={this.addItem}>Add New Item</button>
				<AdminItemList items={this.props.items} filter={this.state.filter}/>
			</section>
		);
	}
}

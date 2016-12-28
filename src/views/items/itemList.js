import React, { Component, PropTypes } from 'react';
import Item from './item';
import './items.css';

export default class ItemList extends Component {
		
	static propTypes = {
		items: PropTypes.array
	};
	
	render() {
		return (
			<div className="item-list">
				<h1>Artwork</h1>
				<ul>
				{
					this.props.items.map((item, idx) => (
						<Item data={item} key={idx}/>
					))
				}
				</ul>
			</div>
		);
	}
}

import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { updateItem } from '../../../core/data/actions';
import store from '../../../core/store';
import 'react-datepicker/dist/react-datepicker.min.css';
import TagDisplay from './tag-display';

export default class AdminItem extends Component {
	
	state = {
		title: this.props.data.title,
		created: this.props.data.created,
		tags: this.props.data.tags
	};
	
	static propTypes = {
		data: PropTypes.object.isRequired
	};
	
	formatDate (d) {
		return new Date(d).toLocaleDateString();
	}
	
	updateTitle = (evt) => {
		console.log(`save title: '${evt.target.value}'`);
		
		let item = this.props.data;
		item.title = evt.target.value;
		store.dispatch(updateItem(item));
	};
	
	updateDate = (newDate) => {
		console.log(`save date`, newDate.format('x'));
		
		let item = this.props.data;
		item.created = parseInt(newDate.format('x'), 10);
		store.dispatch(updateItem(item));
	};
	
	updateTags = (tags) => {
		console.log(`update tags: ${tags}`);
		
		let item = this.props.data;
		item.tags = tags;
		store.dispatch(updateItem(item));
	};
	
	render () {
		let { thumbnail, title, created, tags } = this.props.data;
		
		return (
			<div className="admin-item">
				<img src={thumbnail} alt={title}/>
				<div className="admin-item-info">
					<div className="row">
						<label>Title: </label>
						<input type="text" name="title" value={title}
						       onChange={this.updateTitle}/>
					</div>
					<div className="row">
						<label>Created: </label>
						<DatePicker className="value"
						            dateFormat="DD/MM/YYYY"
						            selected={moment(created)}
						            onChange={this.updateDate}/>
					</div>
					<div className="row">
						<label>Tags: </label>
						<TagDisplay selectedTags={tags} onChange={this.updateTags}/>
					</div>
				</div>
			</div>
		);
	}
}

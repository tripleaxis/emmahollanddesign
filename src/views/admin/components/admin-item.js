import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { updateItem } from '../../../core/data/actions';
import store from '../../../core/store';
import 'react-datepicker/dist/react-datepicker.min.css';
import TagDisplay from './tag-display';
import ImageUpload from './image-upload';

export default class AdminItem extends Component {
  
  state = {
    thumbnail: this.props.data.thumbnail,
    showSaveDialog: false
  };
  
  static propTypes = {
    data: PropTypes.object.isRequired
  };
  
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
  
  updateThumbnail = (newImage) => {
    this.refs.infoBlock.classList.toggle('blur', !!newImage);
    if (newImage) {
      this.setState({
        thumbnail: newImage
      });
    }
  };
  
  resetThumbnail = () => {
    this.refs.infoBlock.classList.remove('blur');
    this.setState({
      thumbnail: this.props.data.thumbnail
    });
  };
  
  saveThumbnail = (response) => {
    console.log('saveThumbnail()', response);
    this.refs.infoBlock.classList.remove('blur');
    
    let item = this.props.data;
    item.thumbnail = response.path;
    store.dispatch(updateItem(item));
  };
  
  render() {
    let { title, created, tags } = this.props.data;
    
    return (
      <div className="admin-item">
        <img src={this.state.thumbnail} alt={title}/>
        <div className="admin-item-info" ref="infoBlock">
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
          <div className="row">
            <ImageUpload onChange={this.updateThumbnail}
                         onSuccess={this.saveThumbnail}
                         onFail={this.resetThumbnail}
                         onCancel={this.resetThumbnail}/>
          </div>
        </div>
      </div>
    );
  }
}

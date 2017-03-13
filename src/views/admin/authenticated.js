import React, { Component, PropTypes } from 'react';
import store from '../../core/store';
import { addItem } from '../../core/data/actions';
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
    const nextId = this.props.items.reduce((id, item) => Math.max(id, item.id), 0) + 1;
    store.dispatch(addItem(nextId));
  };
  
  render() {
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

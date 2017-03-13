import React, { Component, PropTypes } from 'react';

import AdminItem from './admin-item';
import './admin-items.less';

export default class AdminItemList extends Component {
  
  state = {
    filteredItems: this.props.items.slice()
  };
  
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    filter: PropTypes.string
  };
  
  componentWillReceiveProps(newProps) {
    this.setState({
      filteredItems: newProps.items.filter((item) => {
        if (!newProps.filter) return true;
        let filter = newProps.filter.toLowerCase();
        
        return item.title.toLowerCase().includes(filter) ||
          item.tags.toLowerCase().includes(filter);
      })
    })
  }
  
  render() {
    return (
      <ul className="admin-item-list">
        {
          this.state.filteredItems.map((item, idx) => {
            return (
              <li key={idx}>
                <AdminItem data={item}/>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import Item from './item';
import './items.less';

export default class ItemList extends Component {
  
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
  };
  
  render() {
    return (
      <ul className="item-list">
        {
          this.props.items.map((item, idx) => (
            <li key={idx}>
              <Item data={item}/>
            </li>
          ))
        }
      </ul>
    );
  }
}

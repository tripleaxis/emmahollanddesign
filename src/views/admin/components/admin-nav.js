import React, { Component } from 'react';
import { Link } from 'react-router';

export default class AdminNav extends Component {
  
  render() {
    return (
      <nav>
        <ul>
          <li><Link to="/admin/items"/></li>
        </ul>
      </nav>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

function safeUrl(url) {
  return url.replace(/\s/, '-');
}

export default class Item extends Component {
  
  static propTypes = {
    data: PropTypes.object.isRequired
  };
  
  render() {
    let { thumbnail, title } = this.props.data;
    return (
      <div className="item">
        <Link to={safeUrl(`image/${title}`)}>
          <img src={thumbnail} alt={title}/>
        </Link>
      </div>
    );
  }
}

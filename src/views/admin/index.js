import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginButton from './components/login-button';
import AuthenticatedView from './authenticated';
import './admin.less';

class AdminView extends Component {
  
  static propTypes = {
    user: PropTypes.object.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string)
  };
  
  render() {
    const { authenticated, loaded } = this.props.user;
    
    return (
      <div className="Admin">
        <h1>Admin Section</h1>
        { loaded && !authenticated && <LoginButton/> }
        { authenticated && <AuthenticatedView {...this.props}/> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, items, tags } = state;
  return { user, items, tags };
};

export default connect(mapStateToProps)(AdminView);


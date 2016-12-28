import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import LoginButton from '../admin/components/login-button';

class AdminView extends Component {
	
	static propTypes = {
		user: PropTypes.object
	};
	
	render () {
		const { authenticated, loaded } = this.props.user;
		
		return (
			<div className="Admin">
				{ loaded && !authenticated && <LoginButton/> }
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { user } = state;
	return { user };
};

export default connect(mapStateToProps)(AdminView);


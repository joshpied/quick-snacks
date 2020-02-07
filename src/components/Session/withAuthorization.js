import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import AuthUserContext from './context';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    // triggers callback function whenever the auth'ed user changes
    componentDidMount() {
      // the authUser will either be an object or null
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        // if authorization fails (user is null), redirect to sign in page
        if (!condition(authUser)) {
          this.props.history.push(ROUTES.SIGN_IN);
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    // displays passed in component that needs to be protected
    // component rendered as long as the above condition in componentDidMount passes
    render() {
      return (
				// using auth user context avoids displaying the requested page before redirect occurs
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(withRouter, withFirebase)(WithAuthorization);
};

export default withAuthorization;

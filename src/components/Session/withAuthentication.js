import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.props.firebase
            .user(authUser.uid)
            .get()
            .then(userDoc => {
              if (userDoc.exists) {
                authUser['userDetails'] = userDoc.data();
                this.setState({ authUser });
              } else {
                console.log('No document in users collection');
              }
            });
        }
        else this.setState({ authUser: null });
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};

export default withAuthentication;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import * as ROUTES from './constants/routes';
import { withAuthentication } from './components/Session';

import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import ForgotPassword from './auth/ForgotPassword';

import Home from './pages/Home';
import Account from './pages/Account'
import Landing from './pages/Landing';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) this.setState({ authUser });
      else this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <hr />
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.PASSWORD_FORGET} component={ForgotPassword} />
          <Route path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.ACCOUNT} component={Account} />
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);

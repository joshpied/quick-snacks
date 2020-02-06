import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Home from './home/Home';
import Landing from './pages/Landing';

import * as ROUTES from './constants/routes';
import { withFirebase } from './components/Firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser)
        this.setState({authUser})
      else
        this.setState({authUser: null})
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} />
          <hr />
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.HOME} component={Home} />
        </div>
      </Router>
    );
  }
}

export default withFirebase(App);

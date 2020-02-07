import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Home from './home/Home';
import Landing from './pages/Landing';

import Navigation from './components/Navigation';
import * as ROUTES from './constants/routes';
import { withAuthentication } from './components/Session';

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
          <Route path={ROUTES.HOME} component={Home} />
          {/* example for route with props
          <Route
            path="/dashboard"
            render={props => <Dashboard {...props} isAuthed={true} />}
          /> */}
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);

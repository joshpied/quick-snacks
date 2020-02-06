import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Home from './home/Home';
import Landing from './pages/Landing';

import * as ROUTES from './constants/routes';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />
      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
      <Route path={ROUTES.HOME} component={Home} />
    </div>
  </Router>
);

export default App;

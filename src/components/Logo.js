import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import { AuthUserContext } from './Session';

const Logo = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <LogoAuth /> : <LogoNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

// Nav bar displayed when user is signed in
const LogoAuth = () => (
  <Link to={ROUTES.HOME} className="logo-link">
    <h1>QuickSnacks</h1>
  </Link>
);

// Nav bar displayed when no user signed in
const LogoNonAuth = () => (
  <Link to={ROUTES.LANDING} className="logo-link">
    <h1>QuickSnacks</h1>
  </Link>
);

export default Logo;

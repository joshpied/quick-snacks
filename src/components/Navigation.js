import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../auth/SignOut';

import Button from '@material-ui/core/Button';

import * as ROUTES from '../constants/routes';
import { AuthUserContext } from './Session';

const ulStyle = {
  display: 'flex',
  listStyleType: 'none'
};

const liStyle = {
  marginLeft: '1em',
  ':hover': {
    background: 'red'
  }
};

const navStyle = {};

const linkStyle = {
  textDecoration: 'none'
};

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

// Nav bar displayed when user is signed in
const NavigationAuth = () => (
  <div style={navStyle}>
    <Link to={ROUTES.HOME} style={linkStyle}>
      <Button color="primary">Home</Button>
    </Link>
    <Link to={ROUTES.ACCOUNT} style={linkStyle}>
      <Button color="primary">Account</Button>
    </Link>
    <SignOutButton />
  </div>
);

// Nav bar displayed when no user signed in
const NavigationNonAuth = () => (
  <div style={navStyle}>
    <Link to={ROUTES.LANDING} style={linkStyle}>
      <Button color="primary">Landing</Button>
    </Link>
    <Link to={ROUTES.SIGN_IN} style={linkStyle}>
      <Button color="primary">Sign In</Button>
    </Link>
  </div>
);

export default Navigation;

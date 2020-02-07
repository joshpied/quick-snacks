import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../auth/SignOut';

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

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

// Nav bar displayed when user is signed in
const NavigationAuth = () => (
  <ul style={ulStyle}>
    <li style={liStyle}>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li style={liStyle}>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li style={liStyle}>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

// Nav bar displayed when no user signed in
const NavigationNonAuth = () => (
  <ul style={ulStyle}>
    <li style={liStyle}>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li style={liStyle}>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;

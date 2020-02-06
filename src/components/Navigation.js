import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOut';

import * as ROUTES from '../constants/routes';

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
  <ul style={ulStyle}>
    <li style={liStyle}>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
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
export default Navigation;

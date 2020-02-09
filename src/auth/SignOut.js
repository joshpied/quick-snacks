import React from 'react';
import { withFirebase } from '../components/Firebase';
import Button from '@material-ui/core/Button';

const SignOutButton = ({ firebase }) => (
  <Button type="button" onClick={firebase.signOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);

import React from 'react';
import firebase from 'firebase';
// import * as ROUTES from '../constants/routes';

class SignOutButton extends React.Component {
  render() {
    return (
      <button type="button" onClick={this.signOut}>
        Sign Out
      </button>
    );
  }

  signOut = async() => {
    await firebase.auth().signOut();
  };
  
}

export default SignOutButton;


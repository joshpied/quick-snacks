import React from 'react';

import { AuthUserContext, withAuthorization } from '../../components/Session';
import PasswordChangeForm from './PasswordChange';

const accounContainer = {
  textAlign: 'center'
};

const Account = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div style={accounContainer}>
        <h2>
          Account for{' '}
          <span className="text-primary">{authUser.userDetails.username}</span>
        </h2>
        <h3>{authUser.userDetails.email}</h3>
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Account);

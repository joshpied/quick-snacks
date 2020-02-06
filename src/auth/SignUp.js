import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import { withStyles } from '@material-ui/core/styles';

import { withFirebase } from '../components/Firebase';
import * as ROUTES from '../constants/routes';

const SignUpPage = () => (
  <div>
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <SignUpForm />
    </Container>
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .createUser(email, passwordOne)
      // // // // // // ADD USER TO DB TOO
      // .then(authUser => {
      //   return this.props.firebase.user(authUser.user.uid).set(
      //     {
      //       username,
      //       email,
      //     }
      //   );
      // })
      // .then(() => {
      //   return this.props.firebase.doSendEmailVerification();
      // })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                style={{ color: '#ffffff' }}
                autoFocus
                variant="outlined"
                required={true}
                fullWidth
                id="username"
                label="Name"
                name="username"
                value={username}
                autoComplete="username"
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ color: '#ffffff' }}
                variant="outlined"
                required={true}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                autoComplete="email"
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required={true}
                fullWidth
                name="passwordOne"
                label="Password"
                type="password"
                id="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required={true}
                fullWidth
                name="passwordTwo"
                label="Confirm Password"
                type="password"
                id="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            disabled={isInvalid}
            fullWidth
            variant="contained"
          >
            Sign Up
          </Button>
          {error && <p>{error.message}</p>}
          <Grid container justify="center">
            <Grid item>
              <Link href="#" variant="body2" to={ROUTES.SIGN_IN}>
                Already have an account? <span>Sign in</span>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

const SignUpLink = () => (
  <Link variant="body2" to={ROUTES.SIGN_UP}>
    Don't have an account? <span>Sign Up</span>
  </Link>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import { withStyles } from '@material-ui/core/styles';

// import styles from './styles';
import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './ForgotPassword';
import * as ROUTES from '../constants/routes';
import { withFirebase } from '../components/Firebase';

const titleStyle = {
  marginTop: '1em'
};

const SignInPage = () => (
  <div>
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" style={titleStyle}>
        Sign In
      </Typography>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </Container>
  </div>
);

const initialState = { email: '', password: '', error: null };

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div>
        <form onSubmit={e => this.submitLogin(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            autoComplete="email"
            autoFocus
            onChange={this.onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={password}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.onChange}
          />
          <Button
            type="submit"
            disabled={isInvalid}
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          {error ? (
            <Typography component="h5" variant="body2">
              {error.message}
            </Typography>
          ) : null}
        </form>
      </div>
    );
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitLogin = e => {
    const { email, password } = this.state;
    this.props.firebase
      .signIn(email, password)
      .then(() => {
        this.setState({ ...initialState });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    e.preventDefault();
  };
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;
export { SignInForm };

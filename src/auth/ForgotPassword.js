import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { withFirebase } from '../components/Firebase';
import * as ROUTES from '../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Password Forget
      </Typography>
      <PasswordForgetForm />
    </Container>
  </div>
);

const initialState = { email: '', error: null };

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  onSubmit = event => {
    event.preventDefault();
    const { email } = this.state;
    console.log(email);
    console.log(this.props);
    this.props.firebase
      .resetPassword(email)
      .then(() => {
        this.setState({ ...initialState });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';
    
    return (
      <form onSubmit={this.onSubmit}>
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
        <Button
          type="submit"
          disabled={isInvalid}
          fullWidth
          variant="contained"
          color="primary"
        >
          Reset My Password
        </Button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);
export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };
// export default ForgotPasswordPage;
// const ForgotPasswordForm = withFirebase(ForgotPasswordFormBase);
// export { ForgotPasswordForm, ForgotPasswordPageLink };

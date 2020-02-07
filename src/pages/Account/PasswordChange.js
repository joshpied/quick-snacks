import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { withFirebase } from '../../components/Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;
    this.props.firebase
      .updatePassword(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form onSubmit={this.onSubmit}>
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
          <Button
            type="submit"
            disabled={isInvalid}
            fullWidth
            variant="contained"
          >
            Reset My Password
          </Button>
          {error && <p>{error.message}</p>}
        </form>
      </Container>
    );
  }
}
export default withFirebase(PasswordChangeForm);

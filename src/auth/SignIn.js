import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';
import * as ROUTES from '../constants/routes';

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loginError: ''
    };
  }

  render() {
    const { classes } = this.props;

    const buttonStyle = {
      backgroundColor: '#00C170'
    };

    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Link className={classes.link} to={ROUTES.LANDING}>
            <div className={classes.logoContainer}>
              <h1 className={classes.title}>Quick Recipes</h1>
            </div>
          </Link>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={e => this.submitLogin(e)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => this.userTyping('email', e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => this.userTyping('password', e)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              style={buttonStyle}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {this.state.loginError ? (
              <Typography
                className={classes.errorText}
                component="h5"
                variant="body2"
              >
                The email address or password entered is incorrect
              </Typography>
            ) : null}
            <Grid container justify="center">
              <Grid item>
                <Link className={classes.link} variant="body2" to={ROUTES.SIGN_UP}>
                  Don't have an account?{' '}
                  <span className={classes.signUp}>Sign Up</span>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }

  userTyping = (type, e) => {
    switch (type) {
      case 'email':
        this.setState({ email: e.target.value });
        break;
      case 'password':
        this.setState({ password: e.target.value });
        break;
      default:
        break;
    }
  };

  submitLogin = e => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          this.props.history.push(ROUTES.HOME);
        },
        err => {
          this.setState({ loginError: 'server error' });
          console.log(err);
        }
      );
  };
}

export default withStyles(styles)(SignIn);

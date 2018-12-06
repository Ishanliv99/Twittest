import React from 'react';
import { Redirect } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Popper from '@material-ui/core/Popper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/LockOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit
  }
});

const SignIn = props => {
  const {
    open,
    classes,
    anchorEl,
    setAnchor,
    openSignUp,
    goToSignUp,
    handleChange,
    handleSignIn,
    authenticated
  } = props;

  if (openSignUp) {
    return <Redirect push to="/signup" />;
  }

  if (authenticated) {
    return <Redirect push to="/timeline" />;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Popper
          transition
          id="popper"
          open={open}
          placement="top"
          anchorEl={anchorEl}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Typography className={classes.typography}>
                  The username and password you entered did not match our
                  records. Please double-check and try again.
                </Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                required
                autoFocus
                id="username"
                name="username"
                autoComplete="username"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                required
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                autoComplete="current-password"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              color="primary"
              variant="contained"
              buttonRef={setAnchor}
              onClick={handleSignIn}
              className={classes.submit}
            >
              Sign in
            </Button>
            <Divider />
            <Typography component="caption" variant="button">
              Don't have an account?
              <Button
                color="primary"
                onClick={goToSignUp}
                className={classes.button}
              >
                Sign Up
              </Button>
            </Typography>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default withStyles(styles)(SignIn);

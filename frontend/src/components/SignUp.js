import React from 'react';
import { Redirect } from 'react-router';

import Fade from '@material-ui/core/Fade';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
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

const SignUp = props => {
  const {
    open,
    classes,
    anchorEl,
    openSignIn,
    setAnchorEl,
    handleChange,
    handleSignUp
  } = props;

  if (openSignIn) {
    return <Redirect push to="/signin" />;
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
                  Please complete the form with unique username and email with a
                  password.
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
            Sign Up
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                required
                autoFocus
                id="email"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                required
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
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              onClick={handleSignUp}
              buttonRef={setAnchorEl}
              className={classes.submit}
            >
              Sign up
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default withStyles(styles)(SignUp);

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

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
  },
  input: {
    display: 'none'
  },
  typography: {
    padding: theme.spacing.unit * 2
  },
  popper: {
    marginTop: theme.spacing.unit
  }
});

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      openSignUp: false,
      authenticated: false,
      open: false
    };

    this.goToSignUp = this.goToSignUp.bind(this);
    this.goToTimeline = this.goToTimeline.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePopper = this.handlePopper.bind(this);
  }

  goToSignUp() {
    this.setState({ openSignUp: true });
  }

  goToTimeline() {
    this.setState({ authenticated: true });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    axios
      .post('http://127.0.0.1:8000/api/auth/signin', {
        username: this.state.username,
        password: this.state.password
      })
      .then(() => {
        this.goToTimeline();

        this.setState({
          username: '',
          password: ''
        });
      })
      .catch(() => {
        this.handlePopper();
        setTimeout(() => {
          this.handlePopper();
        }, 2000);
      });
    e.preventDefault();
  }

  handlePopper() {
    this.setState(state => ({
      open: !state.open
    }));
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    if (this.state.openSignUp) {
      return <Redirect push to="/signup" />;
    }

    if (this.state.authenticated) {
      return <Redirect push to="/timeline" />;
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Popper
            id="popper"
            open={open}
            anchorEl={this.anchorEl}
            placement="top"
            classname={classes.popper}
            transition
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
                  id="username"
                  name="username"
                  autoComplete="username"
                  required
                  onChange={this.handleChange}
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  required
                  onChange={this.handleChange}
                  autoComplete="current-password"
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                onClick={this.handleSubmit}
              >
                Sign in
              </Button>
              <Divider />
              <Typography component="caption" variant="button">
                Don't have an account?
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={this.goToSignUp}
                >
                  Sign Up
                </Button>
              </Typography>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SignIn);

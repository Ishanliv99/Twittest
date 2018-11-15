import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
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

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      password: '',
      legit: false,
      open1: false,
      open2: false
    };

    this.goToTimeline = this.goToTimeline.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePopper = this.handlePopper.bind(this);
    this.handlePopperEmp = this.handlePopperEmp.bind(this);
  }

  goToTimeline() {
    this.setState({ legit: true });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    if (this.state.username !== '') {
      axios
        .post('http://127.0.0.1:8000/api/auth/signup', {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        })
        .then(() => {
          if (
            this.state.username !== '' &&
            this.state.password !== '' &&
            this.state.email !== ''
          )
            this.goToTimeline();
          else this.handlePopperEmp();

          this.setState({
            username: '',
            email: '',
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
  }

  handlePopper() {
    this.setState(state => ({
      open: !state.open
    }));
  }

  handlePopperEmp() {
    this.setState(state => ({
      open2: !state.open2
    }));
  }

  render() {
    const { classes } = this.props;
    const { open1, open2 } = this.state;

    if (this.state.legit) {
      return <Redirect push to="/timeline" />;
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Popper
            id="popper"
            open={open1}
            anchorEl={this.anchorEl}
            placement="top"
            classname={classes.popper}
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography className={classes.typography}>
                    Please complete the form with unique username and email with
                    a password.
                  </Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
          <Popper
            id="popper"
            open={open2}
            anchorEl={this.anchorEl}
            placement="top"
            classname={classes.popper}
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography className={classes.typography}>
                    Please fill all the required fields.
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
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  onChange={this.handleChange}
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  name="username"
                  autoComplete="username"
                  required
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  required
                  autoComplete="current-password"
                  onChange={this.handleChange}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleSubmit}
                buttonRef={node => {
                  this.anchorEl = node;
                }}
              >
                Sign up
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SignUp);

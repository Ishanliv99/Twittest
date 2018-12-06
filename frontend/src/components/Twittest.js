import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: 'space-between'
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3
  },
  card: {
    display: 'flex'
  },
  cardDetails: {
    flex: 1
  }
});

class Twittest extends Component {
  componentDidMount() {
    axios
      .get('http://127.0.0.1:8000/api/tweets')
      .then(res => {
        this.props.tweetsList(res);
      })
      .catch(err => err);
  }

  render() {
    const {
      tweets,
      classes,
      openSignIn,
      openSignUp,
      goToSignIn,
      goToSignUp
    } = this.props;

    if (openSignUp) {
      return <Redirect push to="/signup" />;
    }

    if (openSignIn) {
      return <Redirect push to="/signin" />;
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.layout}>
          <Toolbar className={classes.toolbarMain}>
            <Button variant="outlined" size="small" onClick={goToSignIn}>
              Sign in
            </Button>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              Twittest
            </Typography>
            <Button variant="outlined" size="small" onClick={goToSignUp}>
              Sign up
            </Button>
          </Toolbar>
          <main>
            <Grid container spacing={40} className={classes.cardGrid}>
              {tweets.map(post => (
                <Grid item key={post.id}>
                  <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                      <CardContent>
                        <Typography component="h2" variant="h5">
                          {post.username}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                          {post.tweet}
                        </Typography>
                      </CardContent>
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Twittest);

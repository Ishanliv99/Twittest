import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Toolbar from '@material-ui/core/Toolbar';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import CardContent from '@material-ui/core/CardContent';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
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
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 80,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  textField: {
    width: theme.spacing.unit * 70
  },
  fab: {
    margin: theme.spacing.unit
  }
});

class Timeline extends Component {
  componentDidMount() {
    axios
      .get('http://127.0.0.1:8000/api/tweets')
      .then(res => {
        let token = localStorage.getItem('jwt');
        this.props.setToken(token);
        this.props.tweetsList(res);
      })
      .catch(err => err);
  }

  render() {
    const {
      id,
      tweets,
      classes,
      signOut,
      thetweet,
      username,
      editMode,
      modalOpen,
      editTweet,
      writeTweet,
      handleModal,
      deleteTweet,
      onEditClick,
      handleChange,
      handleSignOut
    } = this.props;

    if (signOut) {
      return <Redirect push to="/" />;
    }

    if (!username) {
      return <Redirect push to="/signin" />;
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.layout}>
          <Toolbar className={classes.toolbarMain}>
            <Button size="small" onClick={handleModal}>
              Add Tweet
            </Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={modalOpen}
              onClose={handleModal}
            >
              <div style={getModalStyle()} className={classes.paper}>
                <Typography variant="h6" id="modal-title">
                  Write your tweet
                </Typography>
                <TextField
                  rows="4"
                  multiline
                  label="Tweet"
                  name="thetweet"
                  margin="normal"
                  variant="outlined"
                  id="outlined-textarea"
                  onChange={handleChange}
                  placeholder="Tweet here"
                  defaultValue={thetweet}
                  className={classes.textField}
                />
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={writeTweet}
                  className={classes.button}
                >
                  Tweet
                  <Icon className={classes.create}>create</Icon>
                </Button>
              </div>
            </Modal>
            <Typography
              noWrap
              variant="h5"
              component="h2"
              align="center"
              color="inherit"
              className={classes.toolbarTitle}
            >
              Twittest
            </Typography>
            <Button variant="outlined" size="small" onClick={handleSignOut}>
              Sign out
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
                        {username === post.username ? (
                          <div>
                            {editMode === true && post.id === id ? (
                              <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={editMode}
                              >
                                <div
                                  style={getModalStyle()}
                                  className={classes.paper}
                                >
                                  <Typography variant="h6" id="modal-title">
                                    Write your tweet
                                  </Typography>
                                  <TextField
                                    rows="4"
                                    multiline
                                    label="Tweet"
                                    name="thetweet"
                                    margin="normal"
                                    variant="outlined"
                                    id="outlined-textarea"
                                    onChange={handleChange}
                                    defaultValue={thetweet}
                                    placeholder="Tweet here"
                                    className={classes.textField}
                                  />
                                  <Button
                                    color="primary"
                                    variant="outlined"
                                    onClick={() => editTweet(post.id)}
                                    className={classes.button}
                                  >
                                    Tweet
                                    <Icon className={classes.create}>
                                      create
                                    </Icon>
                                  </Button>
                                </div>
                              </Modal>
                            ) : (
                              <IconButton
                                color="primary"
                                aria-label="Edit"
                                className={classes.button}
                                onClick={() => onEditClick(post.tweet, post.id)}
                              >
                                <EditIcon />
                              </IconButton>
                            )}
                            <IconButton
                              color="secondary"
                              aria-label="Delete"
                              className={classes.button}
                              onClick={() => deleteTweet(post.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        ) : (
                          <div />
                        )}
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

export default withStyles(styles)(Timeline);

import axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
// import Profile from './components/Profile';
import Twittest from './components/Twittest';
import Timeline from './components/Timeline';

class App extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      email: '',
      token: '',
      tweets: [],
      open: false,
      username: '',
      password: '',
      anchorEl: '',
      thetweet: '',
      userTweets: [],
      signOut: false,
      editMode: false,
      modalOpen: false,
      openSignIn: false,
      openSignUp: false,
      openProfile: false,
      authenticated: false
    };

    this.setToken = this.setToken.bind(this);
    this.editTweet = this.editTweet.bind(this);
    this.writeTweet = this.writeTweet.bind(this);
    this.tweetsList = this.tweetsList.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
    this.goToSignIn = this.goToSignIn.bind(this);
    this.deleteTweet = this.deleteTweet.bind(this);
    this.setAnchorEl = this.setAnchorEl.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.goToTimeline = this.goToTimeline.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePopper = this.handlePopper.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.userTweetsList = this.userTweetsList.bind(this);
  }

  tweetsList = res => {
    this.setState({ tweets: res.data });
  };

  userTweetsList = res => {
    this.setState({ userTweets: res.data });
  };

  goToSignUp = () => {
    this.setState({ openSignUp: true, openSignIn: false });
  };

  goToSignIn = () => {
    this.setState({ openSignIn: true, openSignUp: false });
  };

  goToTimeline = () => {
    this.setState({
      openSignUp: false,
      openSignIn: false,
      authenticated: true
    });
  };

  goToProfile = () => {
    this.setState({ openProfile: true });
  };

  setAnchorEl = node => {
    this.setState({ anchorEl: node });
  };

  handleSignOut = () => {
    this.setState({
      token: '',
      signOut: true,
      openSignIn: false,
      openSignUp: false,
      authenticated: false
    });
  };

  handleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handlePopper = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  setToken = token => {
    this.setState({ token: token });
  };

  handleSignIn = e => {
    axios
      .post('http://127.0.0.1:8000/api/auth/signin', {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        localStorage.setItem('jwt', res.data.accessToken);
        this.goToTimeline();
      })
      .catch(() => {
        this.handlePopper();
        setTimeout(() => {
          this.handlePopper();
        }, 2000);
      });
    e.preventDefault();
  };

  handleSignUp = e => {
    axios
      .post('http://127.0.0.1:8000/api/auth/signup', {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
      .then(() => {
        this.goToSignIn();
      })
      .catch(() => {
        this.handlePopper();
        setTimeout(() => {
          this.handlePopper();
        }, 2000);
      });
    e.preventDefault();
  };

  writeTweet = () => {
    axios
      .post(
        'http://127.0.0.1:8000/api/users/' + this.state.username + '/tweets',
        { tweet: this.state.thetweet },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': this.state.token
          }
        }
      )
      .then(() => {
        let tweetsArray = this.state.tweets;

        tweetsArray.push({
          tweet: this.state.thetweet,
          username: this.state.username
        });

        this.setState({
          tweets: tweetsArray,
          thetweet: ''
        });
        this.handleModal();
      })
      .catch(err => err);
  };

  editTweet = id => {
    axios
      .put(
        'http://127.0.0.1:8000/api/users/' +
          this.state.username +
          '/tweets/' +
          id,
        { tweet: this.state.thetweet },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': this.state.token
          }
        }
      )
      .then(() => {
        let tweetsArray = this.state.tweets.filter(tweet => {
          return tweet.id !== id;
        });

        tweetsArray.push({
          tweet: this.state.thetweet,
          username: this.state.username
        });

        this.setState({ tweets: tweetsArray, thetweet: '', editMode: false });
      })
      .catch(err => err);
  };

  onEditClick = (tweet, id) => {
    this.setState({ thetweet: tweet, editMode: true, id: id });
  };

  deleteTweet = id => {
    axios
      .delete(
        'http://127.0.0.1:8000/api/users/' +
          this.state.username +
          '/tweets/' +
          id,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': this.state.token
          }
        }
      )
      .then(() => {
        let tweetsArray = this.state.tweets.filter(tweet => {
          return tweet.id !== id;
        });

        this.setState({ tweets: tweetsArray });
      })
      .catch(err => err);
  };

  render = () => {
    const {
      id,
      open,
      token,
      tweets,
      signOut,
      anchorEl,
      username,
      thetweet,
      editMode,
      modalOpen,
      openSignIn,
      openSignUp,
      openProfile,
      authenticated
    } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Twittest
                tweets={tweets}
                openSignIn={openSignIn}
                openSignUp={openSignUp}
                goToSignIn={this.goToSignIn}
                goToSignUp={this.goToSignUp}
                tweetsList={this.tweetsList}
              />
            )}
          />
          <Route
            exact
            path="/signin"
            render={() => (
              <SignIn
                open={open}
                anchorEl={anchorEl}
                openSignUp={openSignUp}
                authenticated={authenticated}
                goToSignUp={this.goToSignUp}
                setAnchorEl={this.setAnchorEl}
                handleChange={this.handleChange}
                handleSignIn={this.handleSignIn}
              />
            )}
          />
          <Route
            path="/signup"
            render={() => (
              <SignUp
                open={open}
                anchorEl={anchorEl}
                openSignIn={openSignIn}
                setAnchorEl={this.setAnchorEl}
                handleChange={this.handleChange}
                handleSignUp={this.handleSignUp}
              />
            )}
          />
          <Route
            path="/timeline"
            render={() => (
              <Timeline
                id={id}
                token={token}
                tweets={tweets}
                signOut={signOut}
                editMode={editMode}
                thetweet={thetweet}
                username={username}
                modalOpen={modalOpen}
                openProfile={openProfile}
                authenticated={authenticated}
                setToken={this.setToken}
                editTweet={this.editTweet}
                writeTweet={this.writeTweet}
                tweetsList={this.tweetsList}
                deleteTweet={this.deleteTweet}
                goToProfile={this.goToProfile}
                handleModal={this.handleModal}
                onEditClick={this.onEditClick}
                handleChange={this.handleChange}
                handleSignOut={this.handleSignOut}
              />
            )}
          />
          {/* <Route
            path="/profile"
            render={() => (
              <Profile
                token={token}
                signOut={signOut}
                username={username}
                userTweets={userTweets}
                authenticated={authenticated}
                setToken={this.setToken}
                tweetsList={this.tweetsList}
                goToProfile={this.goToProfile}
                handleSignOut={this.handleSignOut}
                userTweetsList={this.userTweetsList}
              />
            )}
          /> */}
        </Switch>
      </BrowserRouter>
    );
  };
}

export default App;

const usersController = require('../controllers').users;
const tweetsController = require('../controllers').tweets;
const verifyToken = require('../middlewares/verifyJwtToken');
const verifySignUp = require('../middlewares/verifySignUp');

module.exports = app => {
  app.post('/api/auth/signup', verifySignUp, usersController.signup);
  app.post('/api/auth/signin', usersController.signin);
  app.get('/api/users/tweets', verifyToken, usersController.userTimeline);

  app.post('/api/users/:userId/tweets', tweetsController.create);
  app.get('/api/tweets', tweetsController.list);
  app.put('/api/users/:userId/tweets/:tweetId', tweetsController.update);
  app.delete('/api/users/:userId/tweets/:tweetId', tweetsController.destroy);
};

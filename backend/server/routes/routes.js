const usersController = require('../controllers').users;
const tweetsController = require('../controllers').tweets;
const verifyToken = require('../middlewares/verifyJwtToken');
const verifySignUp = require('../middlewares/verifySignUp');

module.exports = app => {
  app.post('/api/auth/signup', verifySignUp, usersController.signup);
  app.post('/api/auth/signin', usersController.signin);

  app.get('/api/tweets', tweetsController.list);
  app.get('/api/users/:username/tweets', verifyToken, tweetsController.profile);
  app.post('/api/users/:username/tweets', verifyToken, tweetsController.create);
  app.put(
    '/api/users/:username/tweets/:tweetId',
    verifyToken,
    tweetsController.update
  );
  app.delete(
    '/api/users/:username/tweets/:tweetId',
    verifyToken,
    tweetsController.destroy
  );
};

const User = require('../models').User;

verifySignUp = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send('Username is already taken!');
      return;
    }

    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send('Email is already in use!');
        return;
      }

      next();
    });
  });
};

module.exports = verifySignUp;

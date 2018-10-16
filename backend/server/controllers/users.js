const User = require('../models').User;
const Tweet = require('../models').Tweet;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

module.exports = {
  signup(req, res) {
    return User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  signin(req, res) {
    return User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send('User Not Found.');
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            auth: false,
            accessToken: null,
            reason: 'Invalid Password!'
          });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400
        });

        res.status(200).send({ auth: true, accessToken: token });
      })
      .catch(error => res.status(400).send(error));
  },
  userTimeline(req, res) {
    return User.findOne({
      where: { id: req.userId },
      attributes: ['username', 'email'],
      include: [
        {
          model: Tweet,
          as: 'tweets'
        }
      ]
    })
      .then(user => {
        res.status(200).json({
          description: 'Timeline',
          user: user
        });
      })
      .catch(err => {
        res.status(500).json({
          description: 'Cannot access User Timeline',
          error: err
        });
      });
  }
};

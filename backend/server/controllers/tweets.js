const Tweet = require('../models').Tweet;

module.exports = {
  create(req, res) {
    return Tweet.create({
      tweet: req.body.tweet,
      userId: req.params.userId
    })
      .then(tweet => res.status(201).send(tweet))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Tweet.all()
      .then(tweets => res.status(200).send(tweets))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Tweet.find({
      where: {
        id: req.params.tweetId,
        userId: req.params.userId
      }
    })
      .then(tweet => {
        if (!tweet) {
          return res.status(404).send({
            message: 'Tweet Not Found'
          });
        }

        return tweet
          .update({
            tweet: req.body.tweet || tweet.tweet
          })
          .then(updatedTweet => res.status(200).send(updatedTweet))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Tweet.find({
      where: {
        id: req.params.tweetId,
        userId: req.params.userId
      }
    })
      .then(tweet => {
        if (!tweet) {
          return res.status(404).send({
            message: 'Tweet Not Found'
          });
        }

        return tweet
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};

module.exports = (sequelize, DataTypes) => {
  const Tweet = sequelize.define('Tweet', {
    tweet: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  });

  Tweet.associate = models => {
    Tweet.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  return Tweet;
};

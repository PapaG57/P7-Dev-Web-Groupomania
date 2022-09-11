
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Comments;
};

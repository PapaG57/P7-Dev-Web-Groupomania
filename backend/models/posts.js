// Indique le format de la table de modèle post //

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: 'cascade',
    });
    Posts.hasMany(models.Likes, {
      onDelete: 'cascade',
    });
  };
  return Posts;
};

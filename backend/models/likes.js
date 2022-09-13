// Indique le format de la table de modèle Likes //

module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {});
  return Likes;
};

//--------------------------------------------//
// Indicating the format of Likes model table //
//--------------------------------------------//
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {});
  return Likes;
};

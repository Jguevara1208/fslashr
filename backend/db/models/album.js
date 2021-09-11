'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId: DataTypes.INTEGER,
    title: DataTypes.TEXT
  }, {});
  Album.associate = function(models) {
    Album.belongsTo(models.User, { foreignKey: 'userId' })
    Album.hasMany(models.Photo, { foreignKey: 'albumId' })
  };
  return Album;
};
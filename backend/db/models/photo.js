'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    caption: DataTypes.TEXT,
    cameraSettings: DataTypes.TEXT,
    imgUrl: DataTypes.TEXT
  }, {});
  Photo.associate = function(models) {

    const tagColumnMapping = {
      through: 'PhotoTag',
      foreignKey: 'photoId',
      otherKey: 'tagId',
      as: 'tags'
    }

    const favoritesColumnMapping = {
      through: 'Favorite',
      foreignKey: 'photoId',
      otherKey: 'userId',
      as: 'favorites',
    }

    Photo.belongsTo(models.Album, { foreignKey: 'albumId' });
    Photo.belongsTo(models.User, { foreignKey: 'userId' });

    Photo.hasMany(models.Favorite, { foreignKey: 'photoId', onDelete: 'cascade', hooks: true })
    Photo.hasMany(models.Comment, { foreignKey: 'photoId', onDelete: 'cascade', hooks: true })

    Photo.belongsToMany(models.User, favoritesColumnMapping)
    Photo.belongsToMany(models.Tag, tagColumnMapping)
  };
  return Photo;
};
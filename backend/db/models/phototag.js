'use strict';
module.exports = (sequelize, DataTypes) => {
  const PhotoTag = sequelize.define('PhotoTag', {
    photoId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  PhotoTag.associate = function(models) {
    // associations can be defined here
  };
  return PhotoTag;
};
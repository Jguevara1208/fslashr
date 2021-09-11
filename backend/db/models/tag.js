'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tag: DataTypes.TEXT
  }, {});
  Tag.associate = function(models) {

    const tagColumnMapping = {
      through: 'PhotoTag',
      foreignKey: 'tagId',
      otherKey: 'photoId',
      as: 'tags'
    }

    Tag.belongsToMany(models.Photo, tagColumnMapping)
  };
  return Tag;
};
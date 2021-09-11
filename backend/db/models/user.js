'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    bio: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] },
        },
        loginUser: {
          attributes: {},
        },
      },
    });
    
  User.associate = function (models) {
    const followingColumnMapping = {
      through: 'Follow',
      otherKey: 'followingId',
      foreignKey: 'userId',
      as: 'followings'
    }

    const followerColumnMapping = {
      through: 'Follow',
      otherKey: 'userId',
      foreignKey: 'followingId',
      as: 'followers'
    }

    const favoritesColumnMapping = {
      through: 'Favorite',
      foreignKey: 'userId',
      otherKey: 'photoId',
      as: 'favorites'
    }

    User.hasMany(models.Album, { foreignKey: 'userId' });
    User.hasMany(models.Photo, { foreignKey: 'userId' });
    User.hasMany(models.Comment, { foreignKey: 'userId' });

    User.belongsToMany(models.User, followingColumnMapping);
    User.belongsToMany(models.User, followerColumnMapping);
    User.belongsToMany(models.Photo, favoritesColumnMapping)
  };

  User.prototype.toSafeObject = function () { 
    const { id, username, email } = this;
    return { id, username, email };
  };
  
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
  
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };
  
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };
  
  User.signup = async function ({ firstName, lastName, username, email, avatarUrl, bio, password }) {
    const hashedPassword = bcrypt.hashSync(password);

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      avatarUrl,
      bio,
      hashedPassword,
    });

    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};

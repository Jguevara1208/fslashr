'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@demo.com',
        firstName: 'Demo',
        lastName: 'User',
        username: 'DemoUser123',
        avatarUrl: faker.internet.avatar(),
        bio: faker.random.words(20),
        hashedPassword: bcrypt.hashSync('Password1!'),
      },
      {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        avatarUrl: faker.internet.avatar(),
        bio: faker.random.words(20),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        avatarUrl: faker.internet.avatar(),
        bio: faker.random.words(20),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      }, {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        avatarUrl: faker.internet.avatar(),
        bio: faker.random.words(20),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      }, {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        avatarUrl: faker.internet.avatar(),
        bio: faker.random.words(20),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      }, {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        avatarUrl: faker.internet.avatar(),
        bio: faker.random.words(20),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      }, {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        avatarUrl: faker.internet.avatar(),
        bio: faker.random.words(20),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      }, {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        avatarUrl: faker.internet.avatar(),
        bio: faker.random.words(20),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      }, {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        avatarUrl: faker.internet.avatar(),
        bio: faker.random.words(20),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      }, {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        avatarUrl: faker.internet.avatar(),
        bio: faker.random.words(20),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};


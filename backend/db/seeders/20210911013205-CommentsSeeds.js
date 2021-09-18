'use strict';
const faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const comments = []
    for (let i = 1; i < 11; i++) {
      for(let j = 0; j < 40; j++) {
        const randomNumber = Math.floor(Math.random() * 458) + 1
        comments.push({
          userId: i,
          photoId: randomNumber,
          comment: faker.lorem.words(20)
        })
      }
    }
    return queryInterface.bulkInsert('Comments', comments, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};

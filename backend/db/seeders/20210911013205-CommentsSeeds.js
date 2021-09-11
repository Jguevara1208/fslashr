'use strict';
const faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const comments = []
    for (let i = 2; i < 12; i++) {
      for(let j = 0; j < 40; j++) {
        const randomNumber = Math.floor(Math.random() * 506) + 1
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

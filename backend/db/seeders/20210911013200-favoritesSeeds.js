'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const favorites = []
    for (let i = 1; i < 11; i++) {
      for(let j = 0; j < 10; j++) {
        const randomNumber = Math.floor(Math.random() * 364) + 1
        favorites.push({
          userId: i,
          photoId: randomNumber
        })
      }
    }

   return queryInterface.bulkInsert('Favorites', favorites, {});
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

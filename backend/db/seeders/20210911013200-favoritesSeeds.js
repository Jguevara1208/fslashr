'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const favorites = []
    for (let i = 2; i < 12; i++) {
      for(let j = 0; j < 10; j++) {
        const randomNumber = Math.floor(Math.random() * 506) + 1
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

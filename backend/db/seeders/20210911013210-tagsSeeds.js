'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Tags', [
     { tag: 'architecture'},
     {tag: 'nature'},
     {tag: 'food'},
     {tag: 'city'},
     {tag: 'nature'},
     {tag: 'tech'},
     {tag: 'culture'},
     {tag: 'portrait'},
     {tag: 'landscape'},
     {tag: 'blurry'},
   ], {});
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

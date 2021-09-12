'use strict';
const faker = require('faker');
const photoUrls = require('../seedData/photoUrls');
const cameraSettings = ['35mm f/2.4 800iso', '50mm f/5 1000iso', '18mm f/1.4 700iso', '135mm f/4 600iso', '35mm f/1.8 1200iso', '95mm f/3.5 300iso', '55mm f/2 1400iso', '24mm f/7 800iso']



module.exports = {
  up: (queryInterface, Sequelize) => {
    let photos = []
    let usedPhotos = new Set()
    
    photoUrls.forEach(photoUrl => {
      const randomUser = Math.floor(Math.random() * 10) + 1
      const randomCameraSetting = Math.floor(Math.random() * 8)
      if (!usedPhotos.has(photoUrl)) {
        usedPhotos.add(photoUrl)
        photos.push({
          userId: randomUser,
          caption: faker.random.words(),
          cameraSettings: cameraSettings[randomCameraSetting],
          imgUrl: photoUrl
        })
      }
    })

    return queryInterface.bulkInsert('Photos', photos, {});
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

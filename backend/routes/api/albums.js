const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Photo, User, Favorite, Album, Follow } = require('../../db/models')
const { Op } = require('sequelize');
const router = express.Router();

/*--------------------------------------------------------------------------------------------------*/
/*--------------------------------------------Albums------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------*/

router.get('/:albumId', restoreUser, asyncHandler( async (req, res) => {
    const albumId = req.params.albumId
    const album = await Photo.findAll({
        include: {model: User},
        where: {albumId}
    })

    res.json(album)
}))

router.post('/', restoreUser, asyncHandler(async (req, res) => {
    const { title, photos, userId } = req.body;
    const newAlbum = await Album.create({userId, title});
    const albumId = newAlbum.id

    for (let i = 0; i < photos.length; i++) {
        const photo = photos[i]
        const photoDB = await Photo.findByPk(photo);
        await photoDB.update({ albumId: newAlbum.id})
    }

    const newAlbumPhotos = await  Photo.findAll({
        include: { model: User },
        where: { albumId }
    })

    res.json(newAlbumPhotos)
}))

// router.patch('/:id', restoreUser, asyncHandler( async (req, res) => {

// }))

// router.delete('/:id', restoreUser, asyncHandler( async (req, res) => {

// }))

module.exports = router;
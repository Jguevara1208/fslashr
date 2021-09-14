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

    photos.forEach(async photo => {
        const photoDB = await Photo.findByPk(photo.id);
        photoDB.update({ albumId: newAlbum.id})
    })

    res.json(newAlbum)
}))

// router.patch('/:id', restoreUser, asyncHandler( async (req, res) => {

// }))

// router.delete('/:id', restoreUser, asyncHandler( async (req, res) => {

// }))

module.exports = router;
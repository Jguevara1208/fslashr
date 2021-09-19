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
        include: [{model: User}, {model: Album}],
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

    const last = await Album.findByPk(albumId, {
        include: { model: Photo}
    })

    res.json(last)
}))

router.patch('/:albumId', restoreUser, asyncHandler( async (req, res) => {
    const albumId = req.params.albumId;
    const { title, photoIdsToRemove, photoIdsToAdd } = req.body

    const newAlbum = await Album.findByPk(albumId);
    await newAlbum.update({title});

    for(let i = 0; i < photoIdsToRemove.length; i++) {
        const photo = photoIdsToRemove[i];
        const photoDB = await Photo.findByPk(photo);
        await photoDB.update({ albumId: null });
    };

    for(let i = 0; i < photoIdsToAdd.length; i++) {
        const photo = photoIdsToAdd[i];
        const photoDB = await Photo.findByPk(photo);
        await photoDB.update({albumId: newAlbum.id });
    }

    const lastone = await Album.findByPk(albumId, {
        include: { model: Photo }
    })

    res.json(lastone)
}))

router.delete('/:albumId', restoreUser, asyncHandler( async (req, res) => {
    const albumId = req.params.albumId;
    const photos = await Photo.findAll({where: { albumId }});

    for (let i = 0; i < photos.length; i++) {
        const photo = await Photo.findByPk(photos[i].id)
        const updated = await photo.update({albumId: null})
    }

    const album = await Album.findByPk(albumId);
    await album.destroy()
    res.json(albumId)
}))

module.exports = router;
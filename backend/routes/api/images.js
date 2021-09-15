const express = require('express');
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const { Photo, User, Comment} = require('../../db/models');
const router = express.Router();

/*------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------AWS Image Upload------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------*/


router.post('/', restoreUser, singleMulterUpload("image"), asyncHandler(async (req, res) => {
    const imgUrl = await singlePublicFileUpload(req.file);
    const userId = req.user.id;
    let albumId;
    const { caption, cameraSettings } = req.body;
    req.body.albumId === 'undefined' ? albumId = null : albumId = req.body.albumId;

    const photo = await Photo.create({imgUrl, userId, albumId, caption, cameraSettings});
    res.json(photo);
}));

/*-------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------Individual Images------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------*/


router.get('/:photoId', restoreUser, asyncHandler(async (req, res) => {
    const photoId = req.params.photoId;
    const image = await Photo.findByPk(photoId, {
        include: [{
            model: User,
            include: [
                { model: User, as: 'followings' },
                { model: User, as: 'followers' }
            ]}, 
            { model: Comment, include: { model: User}},
            { model: User, as: 'favorites'}
        ]
    });

    res.json(image)
}));

router.patch('/:photoId', restoreUser, asyncHandler(async (req, res) => {
    const photoId = req.params.photoId;
    const { caption, cameraSettings, albumId } = req.body;
    const image = await Photo.findByPk(photoId);
    await image.update({
        caption, cameraSettings, albumId
    })
    res.json(image)
}));

router.delete('/:photoId', restoreUser, asyncHandler(async (req, res) => {
    const photoId = req.params.photoId;
    const userId = req.user.id;

    const image = await Photo.findByPk(photoId);
    await image.destroy();

    const photos = await Photo.findAll({
        where: { userId },
        include: { model: User }
    });


    res.json(photos)
}));

/*-------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------Image Comments---------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------*/

router.post('/:imageId/comments', restoreUser, asyncHandler(async (req, res) => {
    const { comment, photoId, userId } = req.body;

    const newComment = await Comment.create({
        comment, userId, photoId
    });

    const returnComment = await Comment.findByPk(newComment.id, {
        include: { model: User }
    });

    res.json(returnComment);
    
}));

router.delete('/comments/:commentId', restoreUser, asyncHandler(async (req, res) => {
    const commentId = req.params.commentId;

    const comment = await Comment.findByPk(commentId);
    await comment.destroy()

    res.json(commentId)
}))

module.exports = router;
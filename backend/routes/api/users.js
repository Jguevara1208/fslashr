const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const { Photo, User, Favorite, Album, Follow } = require('../../db/models')
const { Op } = require('sequelize');
const router = express.Router();

/*-------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------Validations------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------*/

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

/*-------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------User Signup------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------*/


router.post('/', singleMulterUpload("image"), asyncHandler(async (req, res) => {
    const avatarUrl = await singlePublicFileUpload(req.file);

    const { 
        username,
        email,
        password,
        firstName,
        lastName,
        bio
    } = req.body;

    const user = await User.signup({
        username,
        email,
        password,
        firstName,
        lastName,
        avatarUrl,
        bio
    });

    await setTokenCookie(res, user);

    return res.json({user});
}))

/*-----------------------------------------------------------------------------------------------------*/
/*--------------------------------------------User Info------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/

router.get('/:userId/albums', restoreUser, asyncHandler(async (req, res) => {

    const userId = req.params.userId;

    const albums = await User.findByPk(userId, {
        include: [
            {
                model: Album, include: {
                    model: Photo,
                        where: { userId }
                }
            }
        ]
    })

    res.json(albums.Albums)
}))


router.get ('/:userId/feed', restoreUser, asyncHandler(async (req, res) => {
    // const userId = req.params.userId;
    // const following = await Follow.findAll({
    //     where: { userId }
    // })

    // const userFollowingIds = following.map(following => following.followingId);
    // const feed = await Photo.findAll({
    //     include: [User],
    //     where: { userId: userFollowingIds },
    //     limit: 50
    // });

    // res.json(feed)
    const feed = await Photo.findAll({
        include: [User],
        limit: 50
    })

    res.json(feed)
}));

router.get('/:userId/favorites/photos', restoreUser, asyncHandler (async (req, res) => {
        const userId = req.params.userId;
        const photos = await User.findByPk(userId, {
            include: { model: Photo, as: 'favorites', include: {
                model: User
            }}
        })

        res.json(photos.favorites)
}));

router.get('/:userId/info', restoreUser, asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const info = await User.findByPk(userId, {
        include: [
            { model: User, as: 'followings' },
            { model: User, as: 'followers' },
        ]
    });

    const { followings, followers, } = info;

    res.json({ info, followings, followers });
}))

/*-------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------User Images------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------*/

router.get('/:userId/images', restoreUser, asyncHandler( async (req, res) => {
    const userId = req.params.userId;
    const photos = await Photo.findAll({
        where: { userId },
        include: { model: User }
    })
    res.json(photos)
}))

router.get('/:userId/unused-photos', restoreUser, asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const unusedPhotos = await Photo.findAll({
        where: {
            [Op.and] : [{ userId },{ albumId: null }]
        }
    })

    res.json(unusedPhotos)
}))

/*---------------------------------------------------------------------------------------------------*/
/*--------------------------------------------Follows------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------*/

router.post('/follow', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const followingId = req.body.userToFollow;
    await Follow.create({
        userId,
        followingId
    });
    res.json('ok')
}));

router.delete('/follow', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const followingId = req.body.userToUnfollow;

    const follow = await Follow.findOne({
        where: {
            [Op.and]: [{ userId: userId }, { followingId: followingId }]
        }
    });

    follow.destroy();
    res.json('ok')
}));

/*-----------------------------------------------------------------------------------------------------*/
/*--------------------------------------------Favorites------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/

router.get('/:userId/favorites', restoreUser, asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const favorites = await Favorite.findAll({
        where: { userId }
    });

    res.json(favorites);
}))

router.post('/:userId/favorites', restoreUser, asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const { photoId } = req.body;

    const favorite = await Favorite.create({
        photoId,
        userId
    });

    res.json(favorite);
}))

router.delete('/:userId/favorites', restoreUser, asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const { photoId } = req.body;
    const follow = await Favorite.findOne({
        where: {
            [Op.and] : [{userId}, {photoId}]
        }
    });

    await follow.destroy();

    res.json(photoId);
}))

module.exports = router;
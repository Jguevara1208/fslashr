const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
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

router.post('/', validateSignup, asyncHandler(async(req, res) => {
    const { 
        username,
        email,
        password,
        firstName,
        lastName,
        avatarUrl,
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

router.get('/:userId/info', restoreUser, asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const info = await User.findByPk(userId, {
        include: [
            { model: User, as: 'followings' },
            { model: User, as: 'followers' },
            { model: Photo },
            { model: Photo, as: 'favorites' },
            { model: Album , include: {
                model: Photo,
                where: { userId }
            }}
        ]
    });

    const { favorites, followings, followers, Albums: albums, Photos: photos } = info;

    const userFollowingIds = followings.map(following => following.id);

    const feed = await Photo.findAll({
        include: [User], 
        where: { userId: userFollowingIds }
    });

    console.log(info.Albums[0].Photos)

    res.json({ feed, info, favorites, followings, followers, albums, photos });
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
}));

module.exports = router;
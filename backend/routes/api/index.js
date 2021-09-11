const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require('../../utils/auth')
const { Photo, User, Follow} = require('../../db/models')
const asyncHandler = require('express-async-handler');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.get('/home', restoreUser, asyncHandler( async (req, res) => {
    const userId = req.user.id
    const userFollowing = await Follow.findAll({
        where: { userId }
    })
    const userFollowingIds = userFollowing.map(following => following.followingId)
    const feedPhotos = await Photo.findAll({
        include: [User],
        where: {
            userId: userFollowingIds
        }
    })
    res.json(feedPhotos)
}))

module.exports = router;
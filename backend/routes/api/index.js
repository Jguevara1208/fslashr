const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const albumsRouter = require('./albums.js');
const imagesRouter = require('./images');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/albums', albumsRouter);

router.use('/images', imagesRouter);

module.exports = router;
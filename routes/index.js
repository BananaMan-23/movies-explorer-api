const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { createUser, login, deleteCookies } = require('../controllers/users');
const auth = require('../middlewares/auth');
const errorHandler = require('../middlewares/errorHandler');
const NotFoundError = require('../utils/notFoundError');
const { requestLog, errorLog } = require('../middlewares/logger');

router.use(requestLog);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.use(auth);

router.use('/users', userRoutes);

router.use('/movies', movieRoutes);

router.use('/signout', deleteCookies);

router.use((req, res, next) => next(new NotFoundError('Не найден')));

router.use(errorLog);

router.use(errors());

router.use(errorHandler);

module.exports = router;

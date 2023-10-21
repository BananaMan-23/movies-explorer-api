const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const users = require('./users');
const movies = require('./movies');
const { createUser, login } = require('../controllers/users');

const { deleteCookies } = require('../controllers/users');

const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/NotFoundError');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use('/signout', deleteCookies);

router.use(auth);
router.use('/users', users);
router.use('/movies', movies);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;

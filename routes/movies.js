const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { URL_PAT, ID_PAT } = require('../utils/constants');

const validationId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().min(24).max(24)
      .pattern(ID_PAT),
  }),
});

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_PAT),
    trailerLink: Joi.string().required().pattern(URL_PAT),
    thumbnail: Joi.string().required().pattern(URL_PAT),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
}), createMovie);

router.delete('/:id', validationId, deleteMovie);

module.exports = router;

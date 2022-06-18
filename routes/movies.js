const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createMovieValidation, idValidation } = require('../utils/joiValidators');
const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies');

router.post('/', celebrate(createMovieValidation), createMovie);
router.get('/', getMovies);
router.delete('/:id', celebrate(idValidation), deleteMovie);

module.exports = router;

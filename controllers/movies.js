const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const NotAuthorized = require('../errors/NotAuthorized');

const { ERRMSG_MOVIE_NOT_FOUND, ERRMSG_MOVIE_NOT_YOURS, ERRMSG_BAD_REQUEST } = require('../utils/errorTexts');

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (['ValidationError', 'CastError'].includes(error.name)) next(new BadRequest(ERRMSG_BAD_REQUEST));
      else next(error);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;
  const ourId = req.user._id;

  return Movie.findById(id)
    .then((movie) => {
      if (!movie) throw new NotFound(ERRMSG_MOVIE_NOT_FOUND);
      if (movie.owner.toString() !== ourId) throw new NotAuthorized(ERRMSG_MOVIE_NOT_YOURS);
      return Promise.resolve();
    })
    .then(() => Movie.findByIdAndDelete(id))
    .then((movie) => {
      if (movie) return res.status(200).send(movie);
      throw new NotFound(ERRMSG_MOVIE_NOT_FOUND);
    })
    .catch(next);
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((card) => res.status(200).send(card))
    .catch(next);
};

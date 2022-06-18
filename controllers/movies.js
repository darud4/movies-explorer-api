const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const NotAuthorized = require('../errors/NotAuthorized');

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
      if (['ValidationError', 'CastError'].includes(error.name)) next(new BadRequest('Переданы неверные данные'));
      else next(error);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;
  const ourId = req.user._id;

  return Movie.findById(id)
    .then((movie) => {
      if (!movie) throw new NotFound('Запрошенный фильм не найден');
      if (movie.owner.toString() !== ourId) throw new NotAuthorized('Нельзя удалить чужой фильм');
      return Promise.resolve();
    })
    .then(() => Movie.findByIdAndDelete(id))
    .then((movie) => {
      if (movie) return res.status(200).send(movie);
      throw new NotFound('Запрошенная карточка не найдена');
    })
    .catch(next);
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((card) => res.status(200).send(card))
    .catch(next);
};

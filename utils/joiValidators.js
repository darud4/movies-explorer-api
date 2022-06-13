const { Joi } = require('celebrate');
const validator = require('validator');

const validateUrl = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) throw new Error('Неправильный формат ссылки');
  return value;
};

module.exports.registerValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
};

module.exports.loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

module.exports.idValidation = {
  params: Joi.object().keys({
    id: Joi.string().required().alphanum().min(24)
      .max(24),
  }),
};

module.exports.updateProfileValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
};

module.exports.createFilmValidation = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateUrl),
    trailerLink: Joi.string().required().custom(validateUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom(validateUrl),
    movieId: Joi.string().required(),
  }),
};

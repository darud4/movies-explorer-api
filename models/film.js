const mongoose = require('mongoose');
const { isURL } = require('validator');

const filmSchema = new mongoose.Schema({
  country: { type: String, required: true },
  director: { type: String, required: true },
  duration: { type: Number, required: true },
  year: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, validate: isURL },
  trailerLink: { type: String, validate: isURL },
  thumbnail: { type: String, validate: isURL },
  nameRU: { type: String, required: true },
  nameEN: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  movieId: { type: String, required: true },
});

module.exports = mongoose.model('film', filmSchema);

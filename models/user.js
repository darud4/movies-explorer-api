const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');
const { ERRMSG_LOGIN_ERROR } = require('../utils/errorTexts');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: isEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new AuthError(ERRMSG_LOGIN_ERROR);

      return bcrypt.compare(password, user.password)
        .then((matched) => ((matched) ? user : Promise.reject(new AuthError(ERRMSG_LOGIN_ERROR))));
    });
};

module.exports = mongoose.model('user', userSchema);

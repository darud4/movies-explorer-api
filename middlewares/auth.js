require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { CONFIG } = require('../config');

const { ERRMSG_AUTH_ERROR } = require('../utils/errorTexts');

const { NODE_ENV, JWT_SECRET } = process.env;
const SECRET = NODE_ENV === 'production' ? JWT_SECRET : CONFIG.devSecret;

module.exports.makeToken = (payload) => jwt.sign(payload, SECRET, { expiresIn: '7d' });

module.exports.checkToken = function checkToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) return next(new AuthError(ERRMSG_AUTH_ERROR));
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    throw new AuthError(ERRMSG_AUTH_ERROR);
  }

  req.user = payload;
  return next();
};

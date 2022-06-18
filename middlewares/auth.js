require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { CONFIG } = require('../config');

const { NODE_ENV, JWT_SECRET } = process.env;
const SECRET = NODE_ENV === 'production' ? JWT_SECRET : CONFIG.devSecret;

module.exports.makeToken = (payload) => jwt.sign(payload, SECRET, { expiresIn: '7d' });

module.exports.checkToken = function checkToken(req, res, next) {
  const { authorization } = req.headers;
  console.log('auth 1');
  if (!authorization || !authorization.startsWith('Bearer ')) return next(new AuthError('Ошибка авторизации'));
  console.log('auth 2');
  const token = authorization.replace('Bearer ', '');
  console.log('auth 3');

  let payload;
  console.log('auth 4');
  try {
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    throw new AuthError('Ошибка авторизации');
  }
  console.log('auth 5');

  req.user = payload;
  return next();
};

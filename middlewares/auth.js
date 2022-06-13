require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { CONFIG } = require('../config');

const { NODE_ENV, JWT_SECRET } = process.env;
const SECRET = NODE_ENV === 'production' ? JWT_SECRET : CONFIG.DEV_SECRET;

module.exports.makeToken = (payload) => jwt.sign(payload, SECRET, { expiresIn: '7d' });

module.exports.checkToken = function checkToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) throw new AuthError('Ошибка авторизации');
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    throw new AuthError('Ошибка авторизации');
  }

  req.user = payload;
  return next();
};

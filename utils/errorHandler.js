const { ERRMSG_UNKNOWN_ERROR } = require('./errorTexts');

module.exports.errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? ERRMSG_UNKNOWN_ERROR : err.message;
  res.status(statusCode).send({ message });
  next();
};

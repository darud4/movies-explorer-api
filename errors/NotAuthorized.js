module.exports = class NotAuthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};

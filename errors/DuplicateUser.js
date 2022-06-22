module.exports = class DuplicateUser extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};

const router = require('express').Router();
// const { celebrate } = require('celebrate');
// const usersRouter = require('./users');
// const cardsRouter = require('./cards');
// const NotFound = require('../errors/NotFound');
// const { loginValidation, createUserValidation } = require('../utils/joiValidators');
// const { login, createUser } = require('../controllers/users');
// const { checkToken } = require('../middlewares/auth');

// router.post('/signin', celebrate(loginValidation), login);
// router.post('/signup', celebrate(createUserValidation), createUser);
// router.use(checkToken);
// router.use('/users', usersRouter);
// router.use('/cards', cardsRouter);

// router.use((req, res, next) => {
//  next(new NotFound('Запрошенной страницы не существует'));
// });

module.exports = router;

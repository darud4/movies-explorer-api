const router = require('express').Router();
const { celebrate } = require('celebrate');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFound = require('../errors/NotFound');
const { loginValidation, registerValidation } = require('../utils/joiValidators');
const { login, createUser } = require('../controllers/users');
const { checkToken } = require('../middlewares/auth');

router.post('/signin', celebrate(loginValidation), login);
router.post('/signup', celebrate(registerValidation), createUser);
router.use(checkToken);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => next(new NotFound('Запрошенной страницы не существует')));

module.exports = router;

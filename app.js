const express = require('express');
const mongoose = require('mongoose');
const { celebrate } = require('celebrate');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./utils/errorHandler');
const { CONFIG } = require('./config');
const router = require('./routes/index');
const { NotFound } = require('./errors/NotFound');
const { loginValidation, registerValidation } = require('./utils/joiValidators');
const { login, createUser } = require('./controllers/users');
const { checkToken } = require('./middlewares/auth');


const CORS_CONFIG = {
  credentials: true,
  origin: [
    'http://localhost',
  ],
};

const app = express();

// TODO Helmet
// TODO Rate limiter
app.use(cors(CORS_CONFIG));
app.use(bodyParser.json({ extended: true }));
app.use(requestLogger);

// app.use(router);

app.post('/signin', celebrate(loginValidation), login);
app.post('/signup', celebrate(registerValidation), createUser);

app.use(checkToken);

app.use((req, res, next) => {
  console.log(404);
  next(new NotFound('Запрошенной страницы не существует'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

function connectToBase() {
  mongoose
    .connect(CONFIG.base, {
      useNewUrlParser: true,
    })
    .then(() => {
      app.listen(CONFIG.port);
    })
    .catch(() => { });
}

connectToBase();

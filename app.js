const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./utils/errorHandler');
const { CONFIG } = require('./config');
const router = require('./routes/index');

const { NODE_ENV, BASE } = process.env;
const connectionString = NODE_ENV === 'production' ? BASE : CONFIG.devBase;

const CORS_CONFIG = {
  credentials: true,
  origin: [
    'http://darud-diploma.nomoreparties.sbs',
    'https://darud-diploma.nomoreparties.sbs',
  ],
};

const app = express();

// TODO Helmet
// TODO Rate limiter
app.use(cors(CORS_CONFIG));
app.use(bodyParser.json({ extended: true }));
app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

function connectToBase() {
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
    })
    .then(() => {
      app.listen(CONFIG.port);
    })
    .catch(() => { });
}

connectToBase();

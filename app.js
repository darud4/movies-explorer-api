const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./utils/errorHandler');
const { CONFIG } = require('./config');
const router = require('./routes/index');

const CORS_CONFIG = {
  credentials: true,
  origin: [
    'http://localhost',
  ],
};

const app = express();

// TODO Helmet

app.use(cors(CORS_CONFIG));
app.use(bodyParser.json({ extended: true }));
app.use(requestLogger);

app.use(router);

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

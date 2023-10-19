require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const limiter = require('./utils/limiter');

const routes = require('./routes');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(helmet());

app.use(cors({
  origin: ['http://localhost:3001', 'http://api.diplom.films.nomoredomainsrocks.ru'],
  credentials: true,
}));

app.use(cookieParser());

app.use(limiter);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(routes);

app.listen(PORT);

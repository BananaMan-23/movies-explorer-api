const { SERVER_ERROR } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(SERVER_ERROR).send({ message: 'Ошибка на сервере' });
    next();
  }
};

module.exports = errorHandler;

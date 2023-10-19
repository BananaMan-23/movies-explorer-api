const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../utils/unAuthorizedError');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    return next(new UnAuthorizedError('Необходима авторизация'));
  }

  const token = authorization;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'secret-key');
  } catch (err) {
    return next(new UnAuthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};

const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utils/notFoundError');
const UnAuthorizedError = require('../utils/unAuthorizedError');
const ConflictError = require('../utils/conflictError');
const { OK, CREATED } = require('../utils/constants');
const { NOT_UNIQE } = require('../utils/constants');

const getUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Не найден'));
      }
      return res.status(OK).send({ name: user.name, email: user.email });
    })
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((newUser) => res.status(CREATED).send(
      {
        name: newUser.name,
        email: newUser.email,
        _id: newUser._id,
      },
    ))
    .catch((err) => {
      if (err.code === NOT_UNIQE) {
        return next(new ConflictError('Пользователь уже существует'));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Не найден'));
      }
      return res.status(OK).send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      if (err.code === NOT_UNIQE) {
        return next(new ConflictError('Email уже существует'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnAuthorizedError('Пользователь не зарегистрирован'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new UnAuthorizedError('Неверный email или пароль'));
          }

          const token = jwt.sign({ _id: user._id }, NODE_ENV ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          });

          return res.status(OK).send({ message: `Пользователь ${user.email} успешно зарегистрирован` });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

const deleteCookies = (req, res) => {
  res.status(OK).clearCookie('jwt').send({ message: 'Данные удалены' });
};

module.exports = {
  createUser,
  updateUser,
  login,
  getUser,
  deleteCookies,
};

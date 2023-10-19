const URL_PAT = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const ID_PAT = /^[a-z0-9]+$/;
const DB_URLDEV = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const PORTDEV = 3000;

const OK = 200;
const CREATED = 201;

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const UNAUTHORIZED = 401;
const CONFLICT = 409;
const FORBIDDEN = 403;
const NOT_UNIQE = 11000;

module.exports = {
  URL_PAT,
  ID_PAT,
  DB_URLDEV,
  PORTDEV,
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  UNAUTHORIZED,
  CONFLICT,
  FORBIDDEN,
  NOT_UNIQE,
};

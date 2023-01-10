require('dotenv').config();
const httpStatus = require('http-status');
const BaseError = require('../helpers/baseError');

const errorConverter = (err, req, res, next) => {
  let error = err;

  console.log('middleware error convert', err);

  if (!(error instanceof BaseError)) {
    const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new BaseError(message, statusCode, error.stack, false);
  }

  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  const { NODE_ENV } = process.env;

  console.log('middleware error handler', err);

  if (NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    status: statusCode,
    message,
    ...(NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (NODE_ENV === 'development') {
    console.error(err);
  }

  res.status(statusCode).send(response);

  next();
};

module.exports = {
  errorConverter,
  errorHandler,
};

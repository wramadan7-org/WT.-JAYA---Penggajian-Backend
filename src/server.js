require('dotenv').config();
const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const BaseError = require('./helpers/baseError');
const { errorConverter, errorHandler } = require('./middlewares/errorHandler');
const routesV1 = require('./routes/v1/index');

const app = express();
const { NODE_PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
app.use('/v1', routesV1);

app.response.sendWrapped = function (message, data, statusCode = httpStatus.OK) {
  return this.status(statusCode).send({
    status: statusCode,
    message,
    data,
  });
};

app.listen(NODE_PORT, () => {
  console.log(`App listen on port ${NODE_PORT}`);
});

app.use((req, res, next) => {
  next(new BaseError('Not found', httpStatus.NOT_FOUND));
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;

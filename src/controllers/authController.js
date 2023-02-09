require('dotenv').config();
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const bcrypt = require('../helpers/bcrypt');
const authService = require('../services/auth/authService');
const helperService = require('../services/serviceHelper');
const catchAsync = require('../helpers/catchAsync');
const BaseError = require('../helpers/baseError');

const { JWT_SECRET, JWT_EXPIRES } = process.env;

const authLoginController = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const correctEmail = await helperService.findUserByEmail(email);

  if (!correctEmail) throw new BaseError('Email incorrect', httpStatus.CONFLICT);

  const compare = await bcrypt.comparePassword(password, correctEmail.password);

  if (!compare) throw new BaseError('Password incorrect', httpStatus.CONFLICT);

  const data = {
    id: correctEmail.id,
    first_name: correctEmail.first_name,
    last_name: correctEmail.last_name,
    email: correctEmail.email,
    phone: correctEmail.phone,
    age: correctEmail.age,
    gender: correctEmail.age,
    address: correctEmail.address,
  };

  const token = await jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRES });

  res.sendWrapped('Login successfully', { token }, httpStatus.OK);
});

module.exports = {
  authLoginController,
};

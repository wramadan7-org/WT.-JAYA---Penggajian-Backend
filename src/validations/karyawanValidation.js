const { body, param } = require('express-validator');

const createKaryawanValidation = [
  body('first_name')
    .isString()
    .withMessage('First name must be string')
    .notEmpty()
    .withMessage('First name can\'t be empty'),
  body('last_name')
    .isString()
    .withMessage('Last name must be string')
    .notEmpty()
    .withMessage('Last name can\'t be empty'),
  body('email')
    .isEmail()
    .notEmpty()
    .withMessage('Email can\'t be empty'),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .withMessage('Password min 8 character')
    .notEmpty()
    .withMessage('Password can\'t be empty')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i')
    .withMessage('Password min 8 character, at least one uppercase, at least one lowercase, at lesat one special character'),
  body('phone')
    .isNumeric()
    .withMessage('Phone only contain number')
    .isLength({ min: 10 })
    .withMessage('Phone min 10 character')
    .isLength({ max: 13 })
    .withMessage('Phone max 13 character'),
  body('age')
    .isNumeric()
    .optional({ nullable: true }),
  body('gender')
    .matches(/\b(?:male|female)\b/)
    .optional({ nullable: true }),
  body('address')
    .optional({ nullable: true }),
];

const updateKaryawanValidation = [
  param('id')
    .isNumeric()
    .withMessage('Parameter ID is only number'),
  body('first_name')
    .isString()
    .withMessage('First name must be string')
    .notEmpty()
    .withMessage('First name can\'t be empty')
    .optional(),
  body('last_name')
    .isString()
    .withMessage('Last name must be string')
    .notEmpty()
    .withMessage('Last name can\'t be empty')
    .optional(),
  body('email')
    .isEmail()
    .notEmpty()
    .withMessage('Email can\'t be empty')
    .optional(),
  body('phone')
    .isNumeric()
    .withMessage('Phone only contain number')
    .isLength({ min: 10 })
    .withMessage('Phone min 10 character')
    .isLength({ max: 13 })
    .withMessage('Phone max 13 character')
    .optional(),
  body('age')
    .isNumeric()
    .optional({ nullable: true }),
  body('gender')
    .matches(/\b(?:male|female)\b/)
    .optional({ nullable: true }),
  body('address')
    .optional({ nullable: true }),
];

module.exports = {
  createKaryawanValidation,
  updateKaryawanValidation,
};

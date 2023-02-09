const { body } = require('express-validator');

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

module.exports = {
  createKaryawanValidation,
};

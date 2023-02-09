const { body } = require('express-validator');

const loginValidation = [
  body('email')
    .isEmail()
    .notEmpty(),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .withMessage('Password min 8 character')
    .notEmpty()
    .withMessage('Password can\'t be empty')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i')
    .withMessage('Password min 8 character, at least one uppercase, at least one lowercase, at lesat one special character'),
];

module.exports = {
  loginValidation,
};

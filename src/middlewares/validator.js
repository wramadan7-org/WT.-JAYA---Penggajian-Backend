const httpStatus = require('http-status');
const { validationResult } = require('express-validator');

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.sendWrapped(`${errors.array()[0].msg}`, errors.array(), httpStatus.BAD_REQUEST);
};

module.exports = validate;

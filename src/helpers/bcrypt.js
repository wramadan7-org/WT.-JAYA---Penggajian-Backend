const bcrypt = require('bcrypt');

/**
 * Bcrypt hashing password
 * @param {String} password
 * @returns String
 */
const hashingPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

/**
 * Bcrypt compare password
 * @param {String} passwordString
 * @param {String} passwordHash
 * @returns Boolean
 */
const comparePassword = async (passwordString, passwordHash) => {
  const compare = await bcrypt.compare(passwordString, passwordHash);

  return compare;
};

module.exports = {
  hashingPassword,
  comparePassword,
};

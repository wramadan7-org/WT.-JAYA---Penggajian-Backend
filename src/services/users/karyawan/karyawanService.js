const { User } = require('../../../models');

const createUser = (data) => {
  const user = User.create(data);

  return user;
};

const getUsers = () => User.findAll();

module.exports = {
  createUser,
  getUsers,
};

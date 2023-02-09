const { Op } = require('sequelize');
const { User } = require('../models');

const findUserByEmailOrPhone = async (email, phone) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [
        {
          email,
        },
        {
          phone,
        },
      ],
    },
  });

  return user;
};

const findAnotherUserByEmailOrPhone = async (id, email, phone) => {
  const user = await User.findOne({
    where: {
      [Op.and]: [
        {
          id: {
            [Op.not]: id,
          },
        },
        {
          [Op.or]: [
            {
              email,
            },
            {
              phone,
            },
          ],
        },
      ],
    },
  });

  return user;
};

module.exports = {
  findUserByEmailOrPhone,
  findAnotherUserByEmailOrPhone,
};

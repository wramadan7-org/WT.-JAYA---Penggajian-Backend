const { Op } = require('sequelize');
const { User } = require('../models');

/**
 * Service helper to find User by Email or Phone
 * @param {String} email
 * @param {String} phone
 * @returns Object
 */
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

/**
 * Service helper to find User by Email or Phone where not the own Email or Phone in ID
 * @param {Number} id
 * @param {String} email
 * @param {String} phone
 * @returns Object
 */
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

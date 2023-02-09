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
 * Service helper to find User by Email where not the own Email in ID
 * @param {Number} id
 * @param {String} email
 * @returns Object
 */
const findAnotherUserByEmailService = async (id, email) => {
  const user = await User.findOne({
    where: {
      [Op.and]: [
        {
          id: {
            [Op.ne]: id,
          },
        },
        {
          email,
        },
      ],
    },
  });

  return user;
};

/**
 * Service helper to find User by Phone where not the own Phone in ID
 * @param {Number} id
 * @param {String} phone
 * @returns Object
 */
const findAnotherUserByPhoneService = async (id, phone) => {
  const user = await User.findOne({
    where: {
      [Op.and]: [
        {
          id: {
            [Op.ne]: id,
          },
        },
        {
          phone,
        },
      ],
    },
  });

  return user;
};

module.exports = {
  findUserByEmailOrPhone,
  findAnotherUserByEmailService,
  findAnotherUserByPhoneService,
};

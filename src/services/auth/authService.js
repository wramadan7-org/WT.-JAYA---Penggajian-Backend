const { Op } = require('sequelize');
const { User } = require('../../models');

const authLoginService = async (emailParam, passwordParam) => {
  const user = await User.findOne(
    {
      where: {
        [Op.and]: [
          {
            email: emailParam,
          },
          {
            password: passwordParam,
          },
        ],
      },
    },
  );

  return user;
};

module.exports = {
  authLoginService,
};

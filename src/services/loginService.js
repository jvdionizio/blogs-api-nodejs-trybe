const db = require('../database/models');

const login = async ({ email, password }) => {
  const loginData = await db.User.findOne({
    where: {
      email,
      password,
    },
  });

  return loginData;
};

module.exports = {
    login,
  };
const db = require('../database/models');

const createUser = async ({ email, password, displayName, image }) => {
  const user = await db.User.create({ email, password, displayName, image });

  return user;
};

const getUser = async (email) => {
  const user = await db.User.findOne({ where: { email } });

  return user;
};

module.exports = {
    createUser,
    getUser,
};
const db = require('../database/models');

const createUser = async ({ email, password, displayName, image }) => {
  const user = await db.User.create({ email, password, displayName, image });

  return user;
};

module.exports = {
    createUser,
};
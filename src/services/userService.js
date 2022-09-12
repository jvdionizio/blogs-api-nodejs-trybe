const db = require('../database/models');

const attributesQUERY = [
  'id',
  'displayName',
  'email',
  'image',
 ]; 

const createUser = async ({ email, password, displayName, image }) => {
  const user = await db.User.create({ email, password, displayName, image });

  return user;
};

const getUser = async (email) => {
  const user = await db.User.findOne({ where: { email } });

  return user;
};

const getAllUsers = async () => {
  const listUser = await db.User.findAll({ attributes: attributesQUERY });

  return listUser;
};

module.exports = {
    createUser,
    getUser,
    getAllUsers,
};
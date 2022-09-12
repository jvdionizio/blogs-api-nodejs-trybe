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

const getUserById = async (id) => {
  const userById = await db.User.findOne({ where: { id }, attributes: attributesQUERY });

  return userById;
};

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    getUserById,
};
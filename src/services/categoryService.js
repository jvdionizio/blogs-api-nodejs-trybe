const db = require('../database/models');

const createCategory = async ({ name }) => {
  const category = await db.Category.create({ name }, { fields: ['name'] });

  return category;
};

const findAllCategories = async () => {
  const categoryList = db.Category.findAll({ attributes: ['id', 'name'] });
  return categoryList;
};

module.exports = {
  createCategory,
  findAllCategories,
};
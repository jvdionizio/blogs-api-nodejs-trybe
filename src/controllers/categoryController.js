const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });

  const category = await categoryService.createCategory({ name });

  return res.status(201).json(category);
};

const getAllCategories = async (_req, res) => {
  const categories = await categoryService.findAllCategories();

  return res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getAllCategories,
};
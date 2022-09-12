const { Router } = require('express');

const categoryRouter = Router();
const categoryController = require('../controllers/categoryController');
const tokenValidate = require('../middlewares/tokenValidate');

categoryRouter.post('/', tokenValidate, categoryController.createCategory);
categoryRouter.get('/', tokenValidate, categoryController.getAllCategories);

module.exports = categoryRouter;
const { Router } = require('express');

const usersRouter = Router();
const userController = require('../controllers/userController');
const tokenValidade = require('../middlewares/tokenValidate');

usersRouter.post('/', userController.createUser);
usersRouter.get('/', tokenValidade, userController.getAllUsers);
usersRouter.get('/:id', tokenValidade, userController.getUserById);

module.exports = usersRouter;
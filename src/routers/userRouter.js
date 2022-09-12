const { Router } = require('express');

const usersRouter = Router();
const userController = require('../controllers/userController');

usersRouter.post('/', userController.createUser);

module.exports = usersRouter;
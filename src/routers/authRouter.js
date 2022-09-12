const { Router } = require('express');
const loginController = require('../controllers/loginController');

const authRouter = Router();

authRouter.post('/', loginController.login);

module.exports = authRouter;
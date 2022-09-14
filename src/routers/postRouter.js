const { Router } = require('express');

const postRouter = Router();
const postController = require('../controllers/postController');
const tokenValidate = require('../middlewares/tokenValidate');

postRouter.get('/search', tokenValidate, postController.getPostByTerm);
postRouter.get('/', tokenValidate, postController.getAllPosts);
postRouter.get('/:id', tokenValidate, postController.getPostById);
postRouter.put('/:id', tokenValidate, postController.postUpdate);
postRouter.post('/', tokenValidate, postController.createPost);

module.exports = postRouter;
require('dotenv').config();
const postService = require('../services/postService');
const userVerification = require('../services/userVerificationService.js');

const getAllPosts = async (_req, res) => {
  const postsList = await postService.getAllPosts();

  if (!postsList) return res.status(500).json({ message: 'Something went wrong' });

  return res.status(200).json(postsList);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const postById = await postService.getPostById(id);

  if (!postById) return res.status(404).json({ message: 'Post does not exist' });

  return res.status(200).json(postById);
};

const postUpdate = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content || !id) {
        return res.status(400).json({ message: 'Some required fields are missing' });
      }

    const { postExist, post } = await postService.postUpdate(id, title, content);

    if (!postExist) {
        return res.status(401).json({ message: 'Unauthorized user' });
      }

    return res.status(200).json(post);
  };

const getPostByTerm = async (req, res) => {
    const { q: query } = req.query;
  
    const postByTerm = await postService.getPostByTerm(query);
  
    return res.status(200).json(postByTerm);
  };

const createPost = async (req, res) => {
  const { title, categoryIds, content } = req.body;

  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  } 
  const token = req.headers.authorization;

  const userId = await userVerification(token);

  const postCreated = await postService.createPost(title, categoryIds, content, userId);

  if (postCreated === 'category invalid') {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  return res.status(201).json(postCreated);
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostByTerm,
  postUpdate,
  createPost,
};
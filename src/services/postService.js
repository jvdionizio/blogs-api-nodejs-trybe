const { Op } = require('sequelize');
const db = require('../database/models');

const QUERY = [
  {
    model: db.User,
    as: 'user',
    attributes: { exclude: ['password'] },
  },
  {
    model: db.Category,
    as: 'categories',
  },
];

const getAllPosts = async () => {
  const postsList = await db.BlogPost.findAll({ include: QUERY });
  return postsList;
};

const getPostById = async (id) => {
  const postById = await db.BlogPost.findOne({ where: { id }, include: QUERY });
  return postById;
};

const postUpdate = async (id, title, content) => {
    const [postExist] = await db.BlogPost.update({ title, content }, { where: { id } });
    const post = await db.BlogPost.findOne({ where: { id }, include: QUERY });

    return { postExist, post };
};

const getPostByTerm = async (query) => {
  const search = db.BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: QUERY,
  });

  return search;
};

const createPost = async (title, categoryIds, content, userId) => {
  const categoriesList = await db.Category.findAll();

  const categoriesIds = categoriesList.map(({ id }) => id);
  const isCategoryInList = await categoryIds.some((id) => categoriesIds.includes(id));

  if (isCategoryInList === false) return 'category invalid';

  const postCreated = await db.BlogPost.create({ title, content, userId });

  await Promise.all(categoryIds
    .map((categoryId) => db.PostCategory.create({ categoryId, postId: postCreated.id })));

  return postCreated;
};
module.exports = {
  getAllPosts,
  getPostById,
  getPostByTerm,
  postUpdate,
  createPost,
};
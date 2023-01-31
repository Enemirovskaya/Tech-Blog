const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const postData = require('./postData.json');
const userData = require('./userData.json');
const commentData = require('./commentData.json');

const seedDB = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  for (const post of postData) {
    await Post.create({
      ...post,
    });
  }
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    });
  }
  process.exit(0);
};
seedDB();

module.exports = seedDB;
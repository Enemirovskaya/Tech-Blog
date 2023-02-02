// const sequelize = require("../config/connection");
// const withAuth = require('../utils/auth');
const { Post, User, Comment } = require("../models");
// const session = require("express-session");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({ include: [User] });
    const posts = postData.map((posts) => posts.get({ plain: true }));
    res.render("homepage", {
      posts
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Find by the post ID
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include:[
        User,
        {
        model: Comment, include: [User]
         
         },
    ]
});
if(postData){
  const post = postData.get({ plain: true });
  res.render('post', {
    post
})
}else{
  res.status(404).end()
}  
} catch (err) {
  console.log('something went wrong')
  res.status(500).json(err);
 }
});

// Route to sign up
router.get('/signup', (req,res) => {
    if (req.session.logged_in){
        res.redirect('/')
        return
    }
    res.render('signup')
})
// If logged in, redirect to dashboard
router.get('/login',  (req, res) => {
    if (req.session.logged_in){
        res.redirect('/');
        return
    }
    res.render('login')
})

module.exports = router;

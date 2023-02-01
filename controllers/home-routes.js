// const sequelize = require("../config/connection");
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require("../models");
const session = require("express-session");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({ include: User });
    const posts = postData.map((posts) => posts.get({ plain: true }));
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
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
        {
        model: Comment, include: {
        model: User,
        attributes: ['id', 'username']
         }
         },
         {
         model: 
         User,
         attributes: ['id','username']
       }
    ]
});

  const post = postData.get({ plain: true });
        res.render('post', {
          ...post,
          logged_in: req.session.logged_in,
  })
} catch (err) {
  console.log('something went wrong')
  res.status(400).json(err);
 }
});

//find by the Post
router.get('/post', async (req, res) => {
    try {
      const postData = await Post.findAll ({ include: User })

      const posts = postData.map((posts) => posts.get({ plain: true }));
      res.render('post', {
      posts,
      logged_in: req.session.logged_in,
})
  }  catch (err) {
     res.status(500).json(err)
    }
});

// Route to user's dashboard by ID
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      console.log(req.session.user_id)
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
      const user = userData.get({ plain: true });

    //   console.log(user)

      res.render('dashboard', {
        ...user,
        logged_in: true
      });
      
    } catch (err) {
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

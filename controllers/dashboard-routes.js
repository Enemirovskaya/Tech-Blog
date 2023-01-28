const router = require('express').Router();
const { Post, User, Comment } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
            where: {
                user_id: req.session.user_id
            },
           
        })
        .then(postData => {
            const posts = postData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

        router.get('/new', withAuth, (req, res) => {
            res.render('new-post', {
              layout: 'dashboard',
            });
          });          

});
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
           
        })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'Post is not found' });
                return;
            }

            const post = postData.get({ plain: true });
            res.render('edit-post', { post, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})
router.get('/new', (req, res) => {
    res.render('new-post');
});



module.exports = router;

router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: {
          user_Id: req.session.user_Id,
        },
      });

      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('all-posts-admin', {
        layout: 'dashboard',
        posts,
      });
    } catch (err) {
      res.redirect('login');
    }
  });

  router.get('/new', withAuth, async (req, res) => {
    res.render('new-post')
  });

  router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
      layout: 'dashboard',
    });
  });
  
  router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id);
  
      if (postData) {
        const post = postData.get({ plain: true });
  
        res.render('edit-post', {
          layout: 'dashboard',
          post,
        });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.redirect('login');
    }
  });
  
  module.exports = router;


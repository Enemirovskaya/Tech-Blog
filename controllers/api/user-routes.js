const router = require("express").Router();
const { User, Post } = require("../../models");

// Create user
router.post('/', async (req, res) => {
  try {
      const userData = await User.create(req.body)
      req.session.save(() => {
          req.session.user_id = userData.id,
          req.session.logged_in = true,
          res.status(200).json(userData)
      })
  } catch (err){
      res.status(400).json(err);
  }
})

// Validate sign in
router.post('/login', async (req, res) => {
  try {
      // Verify username
      const userData = await User.findOne({ where: { username: req.body.username }});
      if(!userData){
          res.status(400).json({ message: 'Incorrect username or password'})
          return;
      }
      // Verify password
      const validPassword = await userData.checkPassword(req.body.password);
      if(!validPassword){
          res.status(400).json({ message: 'Incorrect username or password'})
          return;
      }
      console.log(userData)
      const user = userData.get({ plain: true });
      req.session.save(() => {
          req.session.user_id = user.id;
          req.session.logged_in = true;
          res.json({ user: user, message: 'You are logged in!'})
      })
  } catch (err){
      res.status(400).json(err);
  }
});

//Kill the session on logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
      req.session.destroy(() => {
          res.status(204).end();
      });
  } else {
      res.status(404).end();
  }
});

module.exports = router;

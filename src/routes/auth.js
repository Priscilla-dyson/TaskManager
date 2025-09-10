const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { user: req.user || null });
});

router.get('/login', (req, res) => {
  res.render('login', { message: '', user: req.user || null }); 
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/tasks',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

router.get('/signup', (req, res) => {
  res.render('signup', { error: '', user: req.user || null }); // Default error to empty string
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const User = require('../models/User');
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('signup', { error: 'Username already exists', user: req.user || null });
    }
    const user = new User({ username, password });
    await user.save();
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/tasks');
    });
  } catch (err) {
    res.render('signup', { error: 'Error during signup', user: req.user || null });
  }
});

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;
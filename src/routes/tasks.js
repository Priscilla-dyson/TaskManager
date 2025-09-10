const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const Task = require('../models/Task');

router.get('/', isAuthenticated, async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id }).sort({ updatedAt: -1 });
  res.render('dashboard', { tasks, user: req.user });
});

router.post('/add', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new Task({
      title,
      description,
      userId: req.user._id,
    });
    await task.save();
    res.redirect('/tasks');
  } catch (err) {
    res.render('error', { message: 'Error adding task', user: req.user || null });
  }
});

router.post('/:id/edit', isAuthenticated, async (req, res) => {
  const { title, description, status } = req.body;
  try {
    await Task.findByIdAndUpdate(req.params.id, {
      title,
      description,
      status,
      userId: req.user._id,
    });
    res.redirect('/tasks');
  } catch (err) {
    res.render('error', { message: 'Error editing task', user: req.user || null });
  }
});

router.post('/:id/delete', isAuthenticated, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/tasks');
  } catch (err) {
    res.render('error', { message: 'Error deleting task', user: req.user || null });
  }
});

module.exports = router;
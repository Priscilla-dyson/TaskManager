const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('redis');
const passport = require('passport');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/tasks');
require('./src/config/passport');
require('./src/config/db');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main.ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Set user for all templates
app.use((req, res, next) => {
  res.locals.user = req.user || null; // Pass user to all templates
  next();
});

// Redis session store
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`,
});
redisClient.on('error', (err) => console.log('Redis Error:', err));
redisClient.connect().catch(console.error);

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', authRoutes);
app.use('/tasks', taskRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
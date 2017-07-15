const express = require('express');

const authController = require('../controllers/auth');
const refController = require('../controllers/references');

const router = express.Router();

// Wrapper to catch errors for async/await middlewares
const catchErrors = fn =>
  (req, res, next) =>
    fn(req, res, next).catch(next);

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
};

// Authentication
router.get('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/signup', authController.signup, authController.login);

// References
router.get('/refs', isAuthenticated, catchErrors(refController.getRefs));

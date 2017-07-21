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
  return res.status(401).json({ error: 'Not logged in' });
};

// Authentication
router.post('/login', authController.login, authController.loginStatus);
router.get('/logout', authController.logout);
router.post('/signup', authController.signup);

// References
router.get('/refs', isAuthenticated, catchErrors(refController.getRefs));

module.exports = router;

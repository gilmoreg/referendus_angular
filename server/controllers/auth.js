const passport = require('passport');
const promisify = require('es6-promisify');

const User = require('../models/User');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/',
});

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.check = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect('/');
};

exports.signup = async (req, res, next) => {
  const user = new User({ username: req.body.username });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next();
};

const passport = require('passport');
const User = require('../models/User');

exports.login = passport.authenticate('local');

exports.loginStatus = (req, res) => {
  if (req.user) res.status(200).json({ message: 'Login successful', user: req.user.username });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.check = (req, res) => {
  if (req.isAuthenticated()) return res.status(200).json({ message: 'Logged in', user: req.user.username });
  return res.status(200).json({ message: 'Not logged in' });
};

exports.signup = async (req, res) => {
  const user = new User({ username: req.body.username });
  try {
    await User.registerAsync(user, req.body.password);
    req.login(user, (err) => {
      if (!err) {
        return res.status(200).json({ message: 'Signup successful', user: req.user.username });
      }
      throw new Error(`${err}`);
    });
  } catch (error) {
    console.log('error registering', error);
    res.status(500).json({ error });
  }
};

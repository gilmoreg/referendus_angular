const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
/*  username: {
    type: String,
    required: 'Please supply a username',
    trim: true,
  },*/
});

userSchema.plugin(passportLocalMongoose);

// https://github.com/saintedlama/passport-local-mongoose/issues/218
userSchema.statics.registerAsync = function (data, password) {
  return new Promise((resolve, reject) => {
    this.register(data, password, (err, user) => {
      if (err) return reject(err);
      return resolve(user);
    });
  });
};

module.exports = mongoose.model('User', userSchema);

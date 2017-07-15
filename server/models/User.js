const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Please supply a username',
    trim: true,
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);

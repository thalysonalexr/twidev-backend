const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = model('User', UserSchema);

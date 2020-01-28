const { Schema, model } = require("mongoose");
const validate = require("mongoose-validator");

const validateContent = [
  validate({
    validator: "isLength",
    arguments: [1, 280],
    message: "The tweet must contain between 1 and 280 characters."
  })
];

const TweetSchema = Schema({
  content: {
    type: String,
    validate: validateContent,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true
});

module.exports = model('Tweet', TweetSchema);

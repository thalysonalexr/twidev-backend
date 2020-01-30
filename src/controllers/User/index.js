const User = require("../../models/User/index.js");
const Tweet = require("../../models/Tweet/index.js");

module.exports = {
  async create (request, response) {

    const { userGithub } = request;
    const { login } = userGithub;

    const userExists = await User.findOne({ username: login });

    if (userExists) {
      console.log(`User ${login} already exists.`);
      return response.status(200).json(userExists);
    }

    try {
      const user = await User.create({
        name: userGithub.name,
        username: userGithub.login,
        avatar: userGithub.avatar_url,
        bio: userGithub.bio
      });
      
      console.log(`User ${login} created.`);
      return response.status(201).json(user);
    } catch (err) {
      response.status(400).json({
        success: false,
        message: `[error:400] ${err.message}`
      });
    }
  },

  async find(request, response) {

    const { id } = request.params;

    const userDoc = await User.findOne({ _id: id }).select({
      _id: 0,
      name: 1,
      username: 1,
      avatar: 1
    });

    if ( ! userDoc) {
      return response.status(404).json({
        success: false,
        message: '[error:404] user not found.'
      });
    }

    const totalTweets = await Tweet.countDocuments({ author: id });

    const user = {
      name: userDoc.name,
      username: userDoc.username,
      avatar: userDoc.avatar,
      total_tweets: totalTweets
    }

    return response.status(200).json(user);
  }
};

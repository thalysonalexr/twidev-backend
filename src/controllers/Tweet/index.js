const User = require("../../models/User/index.js");
const Tweet = require("../../models/Tweet/index.js");

module.exports = {
  async create (request, response) {
    const { login } = request.userGithub;
    const { content } = request.body;

    if ( ! content.trim()) {
      return response.status(400).json({
        success: false,
        message: "[error:400] No content tweet in request."
      });
    }

    const user = await User.findOne({ username: login });

    const tweet = await Tweet.create({
      content: content,
      author: user._id
    });

    /* get a 25 lasted tweets document */
    const latestTweets = await Tweet
      .find()
      .sort({ _id: -1 })
      .limit(25)
      .populate("author")
      .exec();

    try {
      console.log(`New tweet was posting by ${login}`);

      request.io.emit("new-tweet", latestTweets);

      return response.status(201).json(tweet);
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: `[error:400] ${err.message}`
      });
    }
  },

  async all (request, response) {
     /* get a 25 lasted tweets document */
    const { limit } = request.query;

    let tweets;

    if ( ! limit) {
      tweets = await Tweet
        .find()
        .sort({ _id: -1 })
        .populate("author")
        .exec();
    } else {
      tweets = await Tweet
      .find()
      .sort({ _id: -1 })
      .limit(parseInt(limit))
      .populate("author")
      .exec();
    }

    try {
      return response.status(200).json(tweets);
    } catch (err) {
      return response.status(500).json({
        success: false,
        message: `[error:500] ${err.message}`
      });
    }
  },

  async like (request, response) {
    const { id } = request.params;
    const { login } = request.userGithub;

    const { _id } = await User.findOne({ username: login });

    try {
      const tweet = await Tweet.findById(id);
      
      if ( ! tweet.likes.includes(_id)) {
        tweet.likes.push(_id);
        await tweet.save();

        /* get a 25 latest tweets document */
        const latestTweets = await Tweet
          .find()
          .sort({ _id: -1 })
          .limit(25)
          .populate("author")
          .exec();

        request.io.emit("new-tweet", latestTweets);

        return response.status(201).json(tweet);
      }

      return response.status(204).end();
    } catch (err) {
      return response.status(404).json({
        success: false,
        message: "[error:404] Tweet not found."
      });
    }
  },

  async dislike (request, response) {
    const { id } = request.params;
    const { login } = request.userGithub;

    const { _id } = await User.findOne({ username: login });

    try {
      const tweet = await Tweet.findById(id);
      const index = tweet.likes.indexOf(_id);

      if ( ! tweet.likes.includes(_id)) {
        return response.status(204).end();
      }

      tweet.likes.splice(index, 1);
      await tweet.save();

      /* get a 25 latest tweets document */
      const latestTweets = await Tweet
        .find()
        .sort({ _id: -1 })
        .limit(25)
        .populate("author")
        .exec();

      request.io.emit("new-tweet", latestTweets);

      return response.status(200).json(tweet);
    } catch (err) {
      return response.status(404).json({
        success: false,
        message: "[error:404] Tweet not found."
      });
    }
  }
};

const express = require("express");
const Auth = require("./services/auth.js");
const UserController = require("./controllers/User/index.js");
const GithubController = require("./controllers/Github/oauth.js");
const TweetController = require("./controllers/Tweet/index.js");

const routes = express.Router();

routes.get("/", (request, response) => {
  response.redirect("/v1/");
});

routes.get("/v1/", (request, response) => {
  return response.status(200).json({
    message: "Congratulations! You are accessing Api Twidev V1."
  });
});

routes.post("/v1/users/token/validate", Auth.authenticate, (request, response) => {
  return response.status(200).json({
    username: request.userGithub.login
  });
});

routes.get("/v1/users/github/oauth", GithubController.oauth);
routes.get("/v1/users/signin/callback", GithubController.callback);
routes.post("/v1/users", Auth.authenticate, UserController.find);

routes.get("/v1/tweets", Auth.authenticate, TweetController.getTweets);
routes.post("/v1/tweets", Auth.authenticate, TweetController.newTweet);
routes.post("/v1/tweets/:id/like", Auth.authenticate, TweetController.like);
routes.post("/v1/tweets/:id/dislike", Auth.authenticate, TweetController.dislike);

module.exports = routes;

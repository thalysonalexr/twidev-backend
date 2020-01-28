const api = require("./github.js");

module.exports = {
  async authenticate (request, response, next) {
    const accessToken = request.header("Authorization");

    if ( ! accessToken) {
      return response.status(401).json({
        success: false,
        message: "[error:401] failed to authenticate. No token."
      });
    }

    try {
      const { data } = await api("/user", {
        headers: {
          "Authorization": `token ${accessToken}`
        }
      });

      request.userGithub = data;
      return next();
    } catch (err) {
      return response.status(401).json({
        success: false,
        message: "[error:401] not authorized."
      });
    }
  }
};

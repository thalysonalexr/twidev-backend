const axios = require("axios");

module.exports = {
  async oauth (request, response) {

    const authorize = process.env.GITHUB_AUTHORIZE;
    const client_id = process.env.GITHUB_CLIENT;

    const url = `${authorize}?client_id=${client_id}`;

    response.redirect(url);
  },

  async callback (request, response) {
    const { query } = request;
    const { code } = query;

    if ( ! code) {
      return response.status(400).json({
        sucess: false,
        message: "[error:400] no code in query params"
      });
    }

    const url = process.env.GITHUB_TOKEN;
    const client_id = process.env.GITHUB_CLIENT;
    const client_secret = process.env.GITHUB_SECRET;

    try {
      const { data } = await axios(url, {
        data: {
          client_id: client_id,
          client_secret: client_secret,
          code: code
        },
        headers: {
          Accept: "application/json"
        }
      });
    
      if (data.error) {
        return response.status(401).json({
          sucess: false,
          message: "[error:401] Not authorized."
        });
      }

      return response.status(200).json(data);
    } catch (err) {
      return response.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
};

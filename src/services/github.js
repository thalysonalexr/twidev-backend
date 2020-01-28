const axios = require('axios').default;

const apiGithub = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 30000,
  headers: {
    "Content-Type": "application/json"
  }
});

module.exports = apiGithub;

const env = {
  dev: ".env.dev",
  test: ".env.test",
  prod: ".env"
};

require('dotenv').config({
  path: env[process.env.NODE_ENV]
});

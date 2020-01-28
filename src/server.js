const cors = require("cors");
const express = require("express");
const parser = require("body-parser");
const routes = require("./routes.js");

// development | test | production
if ( ! process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

require("./config/index.js");
require("./services/database.js");

const api = express();
const server = require("http").Server(api);
const io = require("./wss/index.js")(server);
const port = process.env.PORT || 3000;

api.use(cors());
api.use(parser.urlencoded({
  extended: true
}));
api.use(parser.json());
api.use(express.json());

api.use((request, response, next) => {
  request.io = io;
  return next();
});

api.use(routes);

server.listen(port, () => {
  console.log(`[${process.env.NODE_ENV}] Listening server in port ${port}`);
});

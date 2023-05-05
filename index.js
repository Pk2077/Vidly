const express = require("express");
const app = express();
const winston = require("winston");
const config = require("config");

require("./modules/logger")();  
require("./modules/routes")(app);
require("./modules/db")();
require("./modules/configure")();
require("./modules/validation")();
require("./modules/prod")(app);

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => winston.info(`Connected on ${port}..`));


module.exports = server;
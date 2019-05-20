const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");

const projectRouter = require("./projectRouter.js");

const server = express();

server.use(express.json());

//Third party middleware
server.use(helmet());

//Routes
server.use("/api/projects", projectRouter);

server.get("/", (req, res, next) => {
  res.send(`
  <h1>Lambda Backend Sprint #1</h1>
  <h2>This is Roenz's Sprint Project</h2>
  `);
});

module.exports = server;

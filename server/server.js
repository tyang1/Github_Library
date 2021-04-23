const { signUp, logIn, authenticateToken } = require("./auth.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { getAllArticles, addArticle } = require("./articleController.js");

const start = (options) => {
  return new Promise(async (resolve, reject) => {
    const { port, hostname, repo } = options;
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());
    app.use("/", express.static("build"));
    app.get("/home", authenticateToken, (req, res) => {
      res.json(req.user);
    });
    app.get("/server/articles", (req, res, next) => {
      getAllArticles(req, res, next)(repo);
    });
    app.use("/articles", express.static("build"));
    app.post("/server/articles", (req, res, next) => addArticle(req, res, next)(repo));

    app.use("/signup", express.static("build"));
    app.post("/signup", (req, res, next) => {
      signUp(req, res, next)(repo);
    });

    app.use("/login", express.static("build"));
    app.post("/login", (req, res, next) => {
      logIn(req, res, next)(repo);
    });
    const server = app.listen(port, hostname, () => {
      console.log(`Listening on port ${port}, with hostname ${hostname}`);
      resolve(server);
    });
  });
};

module.exports = Object.assign({}, { start });

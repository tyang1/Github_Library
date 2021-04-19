const { signUp, logIn, authenticateToken } = require("./auth.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const { getAllArticles } = require("./articleController.js");
// require("@babel/register")({
//   presets: ["react"],
// });

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
    app.use(
      "/articles",
      express.static("build")
      //would need to let the browser redirect!
    );
    app.use("/login", express.static("build"));
    app.use("/signup", express.static("build"));
    app.post("/signup", (req, res, next) => {
      signUp(req, res, next)(repo);
    });
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

const { signUp, logIn, authenticateToken } = require("./auth.js");
const { StaticRouter } = require("react-router-dom");
const ReactDOMServer = require("react-dom/server");
const React = require("react");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { getAllArticles } = require("./articleController.js");
const App = require("../src/App.js");
require("@babel/register")({
  presets: ["react"],
});

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
    app.get("/server/articles", authenticateToken, (req, res, next) => {
      getAllArticles(req, res, next)(repo);
    });
    app.get("/articles", authenticateToken, (req, res, next) => {
      const context = {};
      const html = ReactDOMServer.renderToString(
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      );
      if (context.url) {
        res.writeHead(302, {
          Location: context.url,
        });
        res.end();
      } else {
        res.write(html);
        res.end();
      }

      // res.writeHead(200, { "Content-Type": "text/html" });
      // res.end(htmlTemplate(reactDom));
      //would need to let the browser redirect!
    });
    app.use("/signup", express.static("build"));
    app.use("/login", express.static("build"));
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

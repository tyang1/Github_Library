const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { signUp, logIn, authenticateToken } = require('./auth.js');

const start = (options) => {
  return new Promise(async (resolve, reject) => {
    const { port, hostname, repo } = options;
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());
    app.use('/', express.static('dist'));
    app.get('/home', authenticateToken, (req, res) => {
      res.json(req.user);
    });
    app.post('/signup', (req, res, next) => {
      signUp(req, res, next)(repo);
    });
    app.post('/login', (req, res, next) => {
      logIn(req, res, next)(repo);
    });
    const server = app.listen(port, hostname, () => {
      console.log(`Listening on port ${port}, with hostname ${hostname}`);
      resolve(server);
    });
  });
};

module.exports = Object.assign({}, { start });

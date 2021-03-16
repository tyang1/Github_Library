const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { generateAccessToken, authenticateToken } = require('./auth.js');

const start = (options) => {
  return new Promise((resolve, reject) => {
    const { port, hostname } = options;
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());
    app.use('/', express.static('dist'));
    app.get('/home', authenticateToken, (req, res) => {
      res.json(req.user);
    });
    app.get('/signup');
    app.post('/login', (req, res, next) => {
      //TODO: validate credentials first

      let token = generateAccessToken({ email: req.body.email });
      res.json(token);
    });
    const server = app.listen(port, hostname, () => {
      console.log(`Listening on port ${port}, with hostname ${hostname}`);
      resolve(server);
    });
  });
};

module.exports = Object.assign({}, { start });

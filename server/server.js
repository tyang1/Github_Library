const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const start = (options) => {
  return new Promise((resolve, reject) => {
    const { port, hostname } = options;
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());
    app.use('/', express.static('dist'));
    app.get('/home', authenticateToken, (req, res) => {});
    app.post('/login', (req, res) => {
      let token = generateAccessToken({ email: req.body.email });
      res.json(token);
    });
    const server = app.listen(port, hostname, () => {
      console.log(`Listening on port ${port}, with hostname ${hostname}`);
      resolve(server);
    });
  });
};

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

function generateAccessToken(email) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1800s',
  });
}

module.exports = Object.assign({}, { start });

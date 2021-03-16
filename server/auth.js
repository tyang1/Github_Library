const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

dotenv.config();
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

function signUp() {}

function logIn(userInfo) {
  const { email, password } = userInfo;
  const myPlaintextPassword = password;
  bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    // Store hash in your password DB.
  });
  //
}

module.exports = {
  authenticateToken,
  generateAccessToken,
  logIn,
  signUp,
};

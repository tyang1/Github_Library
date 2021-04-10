const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const saltRounds = 10;

dotenv.config();

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  const token = req.cookies.jwt_token;
  if (token == null) return res.sendStatus(401); // if there isn't any token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) {
      next();
    }
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

function generateAccessToken(id) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1800s",
  });
}

function logIn(req, res, next) {
  return (repo) => {
    const { email, password } = req.body;
    const myPlaintextPassword = password;
    if (!email || !password) {
      return res.status(400).send({ message: "Some values are missing" });
    }
    // Load hash from your password DB.
    try {
      repo.getPwdHash(email).then((response) => {
        if (!response) {
          return res.status(500).send({ message: "Server error" });
        }
        const { password } = response;
        if (!password) {
          return res
            .status(400)
            .send({ message: "The credentials you provided is incorrect" });
        }
        bcrypt.compare(myPlaintextPassword, password, async (err, result) => {
          if (!result) {
            return res
              .status(400)
              .send({ message: "The credentials you provided is incorrect" });
          } else {
            console.log("passed the login auth!!!");
            let token = generateAccessToken(response.id);
            addCookie(res, token);
          }
        });
      });
    } catch (err) {
      res.status(400).send({ message: err });
    }
  };
}

function signUp(req, res, next) {
  return (repo) => {
    //check to see if the email already existed
    const { email, password } = req.body;
    const myPlaintextPassword = password;
    bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
      // Store hash in your password DB.
      repo.saveUser({ email, hash }).then((result) => {
        let token = generateAccessToken(result.id);
        addCookie(res, token);
        res.status(201).send("User is added");
        // res.status(201).send(`User added with ID: ${result.id}`);
      });
    });
  };
  //
}

function addCookie(res, token) {
  res
    .cookie("jwt_token", token, {
      expires: new Date(Date.now() + 16 * 3600000),
      httpOnly: true,
    })
    .json(token);
}

function checkCookie(req, token) {}

module.exports = {
  authenticateToken,
  generateAccessToken,
  logIn,
  signUp,
};

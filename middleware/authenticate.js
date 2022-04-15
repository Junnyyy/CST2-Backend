require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  // do not authenticate ./ or ./auth
  if (
    req.path == "/" ||
    req.path == "/auth/login" ||
    req.path == "/auth/register"
  )
    return next();
  // grab authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // vertify JWT token
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }

    req.user = user;

    next();
  });
};

module.exports = authenticateJWT;

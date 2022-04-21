require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function generateAccessToken(payloadInfo) {
  var payload = {
    username: payloadInfo.username,
    id: payloadInfo.id,
    firstname: payloadInfo.firstname,
    email: payloadInfo.email,
    admin: payloadInfo.admin,
  };

  return jwt.sign(payload, process.env.TOKEN_SECRET, {});
}

async function generatePassword(unHashedPassword) {
  const salt = await bcrypt.genSalt(10);
  var hashedPassword = await bcrypt.hash(unHashedPassword, salt);

  return hashedPassword;
}

async function comparePassword(reqPassword, queryPassword) {
  return await bcrypt.compare(reqPassword, queryPassword);
}

module.exports = {
  generateAccessToken,
  generatePassword,
  comparePassword,
};

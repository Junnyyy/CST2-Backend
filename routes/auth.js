var express = require("express");
var router = express.Router();
router.use(express.json());
const bcrypt = require("bcrypt");
var database = require("../helpers/database.js");

// Encryption
//const salt = await bcrypt.genSalt(10);

router.post("/register", async (req, res, next) => {
  // Password encryption
  const salt = await bcrypt.genSalt(10);
  var hashedPassword = await bcrypt.hash(req.body.password, salt);
  res.json([hashedPassword, hashedPassword2, validPass, validPass2]);

  //authHelper.addUser("test");
});
//const validPass = await bcrypt.compare(req.body.password, hashedPassword2);

module.exports = router;

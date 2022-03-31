var express = require("express");
var router = express.Router();
router.use(express.json());
//var database = require('./database.js');

router.get("/", function (req, res, next) {
  res.json("API is working properly");
});

router.post("/", function (req, res, next) {
  const { email } = req.body;
  console.log(email);
  res.json(email);
});
module.exports = router;

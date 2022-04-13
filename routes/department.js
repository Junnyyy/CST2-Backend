var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");

module.exports = router;
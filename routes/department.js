var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");
router.get("/", function (req, res, next) {
  const query ='SELECT Department_Name, Location FROM DEPARTMENT;';
  database.query(query,function (err, result) {
    if (err) {
      req.sendStatus(500);
      throw err;
    }
    res.json(result)
  })
  });
module.exports = router;
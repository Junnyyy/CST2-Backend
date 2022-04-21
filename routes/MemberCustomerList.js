var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");

// Return all data
router.get("/", function (req, res, next) {
  const query ='SELECT * FROM member_customer_list;';
  database.query(query,function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result)
  })
});

module.exports = router;
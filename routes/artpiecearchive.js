var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");

router.get("/", function (req, res, next) {
  const query ='SELECT * FROM ART_PIECE_ARCHIVE;';
  database.query(query,function (err, result) {
    if (err) {
      return res.sendStatus(500);
    }
    else {
      res.status(200).json(result);
    }
  })
});

module.exports = router;
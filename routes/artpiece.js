var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");

router.get("/", function (req, res, next) {
  res.sendStatus(401);
});

router.post("/", function (req, res, next) {
  // Data validation
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    req.sendStatus(400);
  }

  const newArt = req.body;
  var data = [newArt.title, newArt.firstname, newArt.lastname];

  const query =
    "INSERT INTO ART_PIECE(Art_Piece_Title, Creator_F_Name, Creator_L_Name) VALUES (?);";

  database.query(query, [data], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.sendStatus(200);
  });
});

module.exports = router;

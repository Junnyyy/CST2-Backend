var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");

router.get("/", function (req, res, next) {
  const query ='SELECT Art_Piece_Title FROM ART_PIECE;';
  database.query(query,function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result);
  })
});

router.post("/", function (req, res, next) {
  // Data validation
  if (Object.keys(req.body).length < 3) return res.status(400);

  const newArt = req.body;
  var data = [newArt.title, newArt.created, newArt.medium, newArt.firstname, newArt.lastname, newArt.status, newArt.culture, newArt.height, newArt.len, newArt.width, newArt.galLoc, newArt.EID];

  const query =
    "INSERT INTO ART_PIECE(Art_Piece_Title, Date_Created, Medium, Creator_F_Name, Creator_L_Name, Being_Refurbished, Culture, Piece_Height, Piece_Length, Piece_Width, Gallery_Loc, Exhibit_ID) VALUES (?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.sendStatus(200);
  });
});

router.delete("/", function(req, res, next) {
  if (Object.keys(req.body).length < 1) return res.status(400);

  const delArt = req.body;
  var data = [delArt.ID];

  const query = "DELETE FROM ART_PIECE WHERE Art_Piece_ID =?;";
  database.query(query, [data], function(err,result) {
    if(err) {
      res.sendStatus(500);
      throw err;
    }
    res.sendStatus(200);
  });
});

module.exports = router;

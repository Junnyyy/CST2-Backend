var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");

router.get("/", function (req, res, next) {
  const query = "SELECT * FROM ART_PIECE;";
  database.query(query, function (err, result) {
    if (err) {
      return res.sendStatus(500);
      
    }
    else {
      return res.status(200).json(result);
    }
  });
});

router.put("/", function (req, res, next) {
  if (req.body.constructor !== Object || Object.keys(req.body).length < 14) {
    return res.sendStatus(500);
  }
  const updateAP = req.body;
  // use primary key to find row to modify

  const Uquery =
  "UPDATE ART_PIECE SET Art_Piece_Title=?, Date_Created=?, Medium=?, Creator_F_Name=?, Creator_L_Name=?, Being_Refurbished=?, Year_Acquired=?, Culture=?, Piece_Height=?, Piece_Length=?, Piece_Width=?, Gallery_Loc=?, Exhibit_ID=? WHERE Art_Piece_ID=?;";
  database.query(
    Uquery,
    [
      updateAP.Art_Piece_Title,
      updateAP.Date_Created,
      updateAP.Medium,
      updateAP.Creator_F_Name,
      updateAP.Creator_L_Name,
      updateAP.Being_Refurbished,
      updateAP.Year_Acquired,
      updateAP.Culture,
      updateAP.Piece_Height,
      updateAP.Piece_Length,
      updateAP.Piece_Width,
      updateAP.Gallery_Loc,
      updateAP.Exhibit_ID,
      updateAP.Art_Piece_ID,
    ],
    function (err, result) {
      if (err) {
        return res.sendStatus(500);
      }
      else {
        return res.sendStatus(200);
      }
    }
  );
});

router.post("/", function (req, res, next) {
  // Data validation
  if (req.body.constructor !== Object || Object.keys(req.body).length < 13) {
    return res.sendStatus(500);
  }
  const newArt = req.body;
  var data = [
    newArt.title,
    newArt.created,
    newArt.medium,
    newArt.firstname,
    newArt.lastname,
    newArt.refurbishedstatus,
    newArt.displaystatus,
    newArt.culture,
    newArt.height,
    newArt.len,
    newArt.width,
    newArt.galLoc,
    newArt.EID,
  ];

  console.log(data);
  const query =
    "INSERT INTO ART_PIECE(Art_Piece_Title, Date_Created, Medium, Creator_F_Name, Creator_L_Name, Being_Refurbished, On_Display, Culture, Piece_Height, Piece_Length, Piece_Width, Gallery_Loc, Exhibit_ID) VALUES (?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      return res.sendStatus(500);
    }
  });

  const returnquery =
    "SELECT Art_Piece_ID FROM ART_PIECE WHERE Art_Piece_Title=?";
  database.query(returnquery, newArt.title, function (err, result) {
    if (err) {
      return res.sendStatus(500); 
    }
    else {
    res.status(200).json(result);
    }
  });
});

router.delete("/", function (req, res, next) {
  const reqAdmin = req.user.admin;
  if(!reqAdmin) {
    console.log(reqAdmin);
    return res.status(401).json({error: "You're not authorized to complete this action!"})
  }
  if (req.body.constructor !== Object || Object.keys(req.body).length < 1) {
    return res.sendStatus(500);
  }

  const delArt = req.body;
  var data = [delArt.Art_Piece_ID];

  const query = "DELETE FROM ART_PIECE WHERE Art_Piece_ID =?;";
  database.query(query, [data], function (err, result) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }else {
      return res.sendStatus(200);
    }
  });
});

module.exports = router;

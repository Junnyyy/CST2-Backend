var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");

const reqUsername = req.user.username;
const reqID = req.user.id;
const reqFirstname = req.user.firstname;
const reqEmail = req.user.email;

const reqAdmin = req.user.admin;

router.get("/", function (req, res, next) {
  const query =
    "SELECT * FROM ART_PIECE;";
  database.query(query, function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result);
  });
});

router.put("/", async (req, res, next) => {
  if (req.body.constructor !== Object || Object.keys(req.body).length < 14) {
    return res.sendStatus(500);
  }
  else {
    next();
  }
}, (req, res, next) => {
  const updateAP = req.body;
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
        return res.status(404).json({error: err.sqlMessage});
      } else if(result.affectedRows==0){
        return res.status(500);
      }
      else {
        next();
      }
    }
  );
  return;
}, (req, res, next) => {
  return res.sendStatus(200);
});


router.post("/", function (req, res, next) {
  // Data validation
  if (req.body.constructor !== Object || Object.keys(req.body).length < 13) {
    res.sendStatus(400);
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
  const query =
    "INSERT INTO ART_PIECE(Art_Piece_Title, Date_Created, Medium, Creator_F_Name, Creator_L_Name, Being_Refurbished, On_Display, Culture, Piece_Height, Piece_Length, Piece_Width, Gallery_Loc, Exhibit_ID) VALUES (?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      return res.status(404).json({error: err.sqlMessage});
    }
  });

  const returnquery =
    "SELECT Art_Piece_ID FROM ART_PIECE WHERE Art_Piece_Title=?;";
  database.query(returnquery, newArt.title, function (err, result) {
    if (err) {
      return res.sendStatus(500);
    }
    else {
      return res.status(200).json(result);
    }
    res.json(result);
  });
});

router.delete("/", function (req, res, next) {
  const reqAdmin = req.user.admin;
  if(!reqAdmin) {
    res.status(404).json({error: "You're not authorized to complete this action. Contact supervisor!"});
  }
  if (req.body.constructor !== Object || Object.keys(req.body).length < 1) {
    res.sendStatus(400);
  }

  const delArt = req.body;
  var data = [delArt.Art_Piece_ID];
  
  const query = "DELETE FROM ART_PIECE WHERE Art_Piece_ID =?;";
  database.query(query, [data], function (err, result) {
    if (err) {
      return res.sendStatus(500);
    }else {
      return res.sendStatus(200);
    }
    res.sendStatus(200);
  });
  return;
});

module.exports = router;

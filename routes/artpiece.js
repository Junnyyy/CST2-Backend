var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");

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


router.put("/", function (req, res, next) {
  const updateAP = req.body;
  // use primary key to find row to modify
  const Squery =
    "SELECT Art_Piece_Title, Date_Created, Medium, Creator_F_Name, Creator_L_Name, Being_Refurbished, On_Display, Year_Acquired, Culture, Piece_Height, Piece_Length, Piece_Width, Gallery_Loc, Exhibit_ID FROM ART_PIECE WHERE Art_Piece_ID=?;";
  database.query(Squery, updateAP.ID, function (err, results) {
    if (err) {
      //row doesn't exist
      res.sendStatus(404);
      throw err;
    }
    // creates an array that holds the key values that the query returned
    // primary key cannot be modified
    var APPK = updateAP.ID;
    //if an attribute is not to be modified, then the original req will have that key assigned to a value that is an empty string
    //if an attribute is to be modified, then the original req will hold that value in the associated key
    if (updateAP.title == "") {
      var newTitle = results[0].Art_Piece_Title;
    } else {
      var newTitle = updateAP.title;
    }
    if (updateAP.created == "") {
      var newCreated = results[0].Date_Created;
    } else {
      var newCreated = updateAP.created;
    }
    if (updateAP.medium == "") {
      var newMedium = results[0].Medium;
    } else {
      var newMedium = updateAP.medium;
    }
    if (updateAP.firstname == "") {
      var newFname = results[0].Creator_F_Name;
    } else {
      var newFname = updateAP.firstname;
    }
    if (updateAP.lastname == "") {
      var newLname = results[0].Creator_L_Name;
    } else {
      var newLname = updateAP.lastname;
    }
    /*if(updateAP.refurbishedstatus=="") {
      var newRefurbished =results[0].Being_Refurbished;
    }
    else {
      var newRefurbished = updateAP.refurbishedstatus;
    }
    if(updateAP.displaystatus=="") {
      var newDisplay = results[0].On_Display;
    }
    else {
      var newDisplay = updateAP.displaystatus;
    }*/
    if (updateAP.year == "") {
      var newYear = results[0].Year_Acquired;
    } else {
      var newYear = updateAP.year;
    }
    if (updateAP.culture == "") {
      var newCulture = results[0].Culture;
    } else {
      var newCulture = updateAP.culture;
    }
    if (updateAP.height == "") {
      var newHeight = results[0].Piece_Height;
    } else {
      var newHeight = updateAP.height;
    }
    if (updateAP.len == "") {
      var newLen = results[0].Piece_Length;
    } else {
      var newLen = updateAP.len;
    }
    if (updateAP.width == "") {
      var newWidth = results[0].Piece_Width;
    } else {
      var newWidth = updateAP.width;
    }
    if (updateAP.galLoc == "") {
      var newGal = results[0].Gallery_Loc;
    } else {
      var newGal = updateAP.galLoc;
    }
    if (updateAP.EID == "") {
      var newEID = results[0].Exhibit_ID;
    } else {
      var newEID = updateAP.EID;
    }
    const Uquery =
      "UPDATE ART_PIECE SET Art_Piece_Title=?, Date_Created=?, Medium=?, Creator_F_Name=?, Creator_L_Name=?, Year_Acquired=?, Culture=?, Piece_Height=?, Piece_Length=?, Piece_Width=?, Gallery_Loc=?, Exhibit_ID=? WHERE Art_Piece_ID=?;";
    database.query(
      Uquery,
      [
        newTitle,
        newCreated,
        newMedium,
        newFname,
        newLname,
        newYear,
        newCulture,
        newHeight,
        newLen,
        newWidth,
        newGal,
        newEID,
        APPK,
      ],
      function (err, result) {
        if (err) {
          throw err;
        }
      }
    );
  });
  res.sendStatus(200);
});

router.post("/", function (req, res, next) {
  // Data validation
  if (Object.keys(req.body).length < 3) return res.status(400);

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
      res.sendStatus(500);
      throw err;
    }
  });

  const returnquery =
    "SELECT Art_Piece_ID FROM ART_PIECE WHERE Art_Piece_Title=?;";
  database.query(returnquery, newArt.title, function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result);
  });
});

router.delete("/", function (req, res, next) {
  if (Object.keys(req.body).length < 1) return res.status(400);

  const delArt = req.body;
  var data = [delArt.ID];

  const query = "DELETE FROM ART_PIECE WHERE Art_Piece_ID =?;";
  database.query(query, [data], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.sendStatus(200);
  });
});

module.exports = router;

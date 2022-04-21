var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");


router.get("/", function (req, res, next) {
  const query ='SELECT * FROM EXHIBIT;';
  database.query(query,function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result)
  })
});



router.put("/", function(req, res, next) {
  if (req.body.constructor !== Object || Object.keys(req.body).length < 8) {
    res.sendStatus(400);
  }
  const updateEx = req.body;
  // use primary key to find row to modify
  const Squery = "SELECT Exhibit_Name, Arrival_Date, Departure_Date, Permanent, Ticket_Price, Number_Tickets_Sold, Managing_Department, Located_In FROM EXHIBIT WHERE Exhibit_ID=?;";
  database.query(Squery,updateEx.EID,function(err,results){
    if(err) {
      //row doesn't exist
      res.sendStatus(404);
      throw err;
    }
    // creates an array that holds the key values that the query returned
    // primary key cannot be modified
    var exPK = updateEx.EID;
    //if an attribute is not to be modified, then the original req will have that key assigned to a value that is an empty string
    //if an attribute is to be modified, then the original req will hold that value in the associated key
    if(updateEx.name=="") {
      var newName =results[0].Exhibit_name;
    }
    else {
      var newName = updateEx.name;
    }
    if(updateEx.arr=="") {
      var newArr = results[0].Arrival_Date;
    }
    else {
      var newArr = updateEx.arr;
    }
    if(updateEx.depart=="") {
      var newDepart =results[0].Departure_Date;
    }
    else {
      var newDepart = updateEx.depart;
    }
    if(updateEx.permanent=="") {
      var newPermanent = results[0].Permanent;
    }
    else {
      var newPermanent = updateEx.permanent;
    }
    if(updateEx.price=="") {
      var newPrice =results[0].Ticket_Price;
    }
    else {
      var newPrice = updateEx.price;
    }
    if(updateEx.manager=="") {
      var newManager =results[0].Managing_Department;
    }
    else {
      var newManager = updateEx.Managing_Department;
    }
    if(updateEx.loc=="") {
      var newLoc = results[0].Located_In;
    }
    else {
      var newLoc = updateEx.loc;
    }
    const Uquery = "UPDATE EXHIBIT SET Exhibit_Name=?, Arrival_Date=?, Departure_Date=?, Permanent=?, Ticket_Price=?, Managing_Department=?, Located_In=? WHERE Exhibit_ID=?;";
    database.query(Uquery,[newName, newArr, newDepart, newPermanent, newPrice, newManager, newLoc, exPK], function(err,result){
      if(err) {
        throw err;
      }
    });
  });
  res.sendStatus(200);
});

router.post("/", function (req, res, next) {
  // Data validation
  if (req.body.constructor !== Object || Object.keys(req.body).length < 7) {
    res.sendStatus(400);
  }

  const newEx = req.body;
  var data = [newEx.name, newEx.arr, newEx.depart, newEx.permanent, newEx.price, newEx.manager, newEx.loc];
  const query =
    "INSERT INTO EXHIBIT(Exhibit_Name, Arrival_Date, Departure_Date, Permanent, Ticket_Price, Managing_Department, Located_In) VALUES(?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      throw err;
    }
  });
  const returnquery = "SELECT Exhibit_ID FROM EXHIBIT WHERE Exhibit_Name=?;";
  database.query(returnquery, newEx.name, function(err,result){
    if(err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result);
  });
});
router.delete("/", function(req, res, next) {
  if (req.body.constructor !== Object || Object.keys(req.body).length < 1) {
    res.sendStatus(400);
  }

  const delEx = req.body;
  var data = [delEx.EID];

  const query = "DELETE FROM EXHIBIT WHERE Exhibit_ID =?;";
  database.query(query, [data], function(err,result) {
    if(err) {
      res.sendStatus(500);
      throw err;
    }
    res.sendStatus(200);
  });
});
module.exports = router;
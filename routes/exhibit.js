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
  const updateEx = req.body;

    const Uquery = "UPDATE EXHIBIT SET Exhibit_Name=?, Arrival_Date=?, Departure_Date=?, Permanent=?, Ticket_Price=?, Managing_Department=?, Located_In=? WHERE Exhibit_ID=?;";
    database.query(Uquery,
      [updateEx.Exhibit_Name, 
        updateEx.Arrival_Date, 
        updateEx.Departure_Date, 
        updateEx.Permanent, 
        updateEx.Ticket_Price, 
        updateEx.Managing_Department, 
        updateEx.Located_In, 
        updateEx.Exhibit_ID
      ], 
        function(err,result){
      if(err) {
        throw err;
      }
    });
  res.sendStatus(200);
});

router.post("/", function (req, res, next) {
  // Data validation
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
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
  if (Object.keys(req.body).length < 1) return res.status(400);

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
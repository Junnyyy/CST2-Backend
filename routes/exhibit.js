var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");


router.get("/", function (req, res, next) {
  const query ='SELECT * FROM EXHIBIT;';
  database.query(query,function (err, result) {
    if (err) {
      return res.sendStatus(500);
    }
    return res.json(result)
  })
});


router.post("/", function (req, res, next) {
  // Data validation
  if (req.body.constructor !== Object || Object.keys(req.body).length < 7) {
    return res.sendStatus(500);
  }

  const newEx = req.body;
  var data = [newEx.name, newEx.arr, newEx.depart, newEx.permanent, newEx.price, newEx.manager, newEx.loc];
  const query =
    "INSERT INTO EXHIBIT(Exhibit_Name, Arrival_Date, Departure_Date, Permanent, Ticket_Price, Managing_Department, Located_In) VALUES(?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      return res.status(404).json({error: err.sqlMessage});
    }
  });
  const returnquery = "SELECT Exhibit_ID FROM EXHIBIT WHERE Exhibit_Name=?;";
  database.query(returnquery, newEx.name, function(err,result){
    if(err) {
      return res.sendStatus(500);
    }
    else {
      return res.status(200).json(result);
    }
  });
  return;
});
router.delete("/", function(req, res, next) {
  if (req.body.constructor !== Object || Object.keys(req.body).length < 1) {
    return res.sendStatus(500);
  }

  const delEx = req.body;
  var data = [delEx.EID];

  const query = "DELETE FROM EXHIBIT WHERE Exhibit_ID =?;";
  database.query(query, [data], function(err,result) {
    if (err) {
      return res.sendStatus(500);
    }
    else {
      return res.sendStatus(200);
    }
  });
  return;
});
module.exports = router;
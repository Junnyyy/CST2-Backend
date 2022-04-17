var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");
router.get("/", function (req, res, next) {
  const query ='SELECT Exhibit_Name, Ticket_Price, Arrival_Date, Departure_Date FROM EXHIBIT;';
  database.query(query,function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result)
  })
});

router.post("/", function (req, res, next) {
  // Data validation
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.sendStatus(400);
  }

  const newEx = req.body;
  var data = [newEx.name, newEx.arr, newEx.depart, newEx.manager, newEx.loc];
  const query =
    "INSERT INTO EXHIBIT(Exhibit_Name, Arrival_Date, Departure_Date, Managing_Department, Located_In) VALUES(?);";
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
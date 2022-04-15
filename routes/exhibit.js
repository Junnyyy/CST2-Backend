var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");
router.get("/", function (req, res, next) {
  const query ='SELECT Exhibit_Name, Ticket_Price, Arrival_Date, Departure_Date FROM EXHIBIT;';
  database.query(query,function (err, result) {
    if (err) {
      req.sendStatus(500);
      throw err;
    }
    res.json(result)
  })
  });
module.exports = router;
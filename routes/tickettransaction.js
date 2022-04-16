var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");
router.get("/", function (req, res, next) {
  const query ='SELECT Ticket_Transaction_ID, Ticket_Customer_ID, Ticket_Total_Bill, Ticket_Exhibit_ID, Ticket_Transaction_Date FROM TICKET_TRANSACTION;';
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

  const newTicketTran = req.body;
  var data = [newTicketTran.CID,newTicketTran.total,newTicketTran.EID];
  const query = "INSERT INTO ticket_transaction(Ticket_Customer_ID, Ticket_Total_Bill, Ticket_Exhibit_ID, Ticket_Transaction_Date) VALUES(?,CURDATE());";
  database.query(query, [data], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.sendStatus(200);
  });
});

module.exports = router;
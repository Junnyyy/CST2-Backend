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
  const newTicketTran = req.body;
  var data = [newTicketTran.CID,newTicketTran.EID];
  const query = "INSERT INTO ticket_transaction(Ticket_Customer_ID, Ticket_Exhibit_ID) VALUES(?);";
  database.query(query, [data], function (err, results) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    const returnquery = "SELECT Ticket_Transaction_ID FROM TICKET_TRANSACTION WHERE Ticket_Customer_ID=? AND Ticket_Exhibit_ID=? AND Ticket_Transaction_Date=CURDATE();";
    database.query(returnquery, [newTicketTran.CID, newTicketTran.EID], function(err,result){
      if(err) {
        res.sendStatus(500);
        throw err;
      }
      res.json(result);
    });
  });
});

module.exports = router;
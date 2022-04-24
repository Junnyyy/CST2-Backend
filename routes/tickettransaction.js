var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");


router.get("/", function (req, res, next) {
  const query ='SELECT * FROM TICKET_TRANSACTION;';
  database.query(query,function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result)
  })
});

router.put("/", function (req, res, next) {
  if (req.body.constructor !== Object || Object.keys(req.body).length < 5) {
    return res.sendStatus(500);
  }
  const updateTT = req.body;
  // use primary key to find row to modify

  const Uquery =
  "UPDATE Ticket_TRANSACTION SET Ticket_Customer_ID=?, Ticket_Exhibit_ID=?, Ticket_Total_Bill=?, Ticket_Transaction_Date=? WHERE Ticket_Transaction_ID=?;";
  database.query(
    Uquery,
    [
      updateTT.Ticket_Customer_ID,
      updateTT.Ticket_Exhibit_ID,
      updateTT.Ticket_Total_Bill,
      updateTT.Ticket_Transaction_Date,
      updateTT.Ticket_Transaction_ID
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
  if (req.body.constructor !== Object || Object.keys(req.body).length < 2) {
    return res.sendStatus(500);
  }
  const newTicketTran = req.body;
  var data = [newTicketTran.CID,newTicketTran.EID];
  const query = "INSERT INTO ticket_transaction(Ticket_Customer_ID, Ticket_Exhibit_ID) VALUES(?);";
  database.query(query, [data], function (err, results) {
    if (err) {
      return res.sendStatus(500);
    }
    const returnquery = "SELECT Ticket_Transaction_ID FROM TICKET_TRANSACTION WHERE Ticket_Customer_ID=? AND Ticket_Exhibit_ID=? AND Ticket_Transaction_Date=CURDATE();";
    database.query(returnquery, [newTicketTran.CID, newTicketTran.EID], function(err,result){
      if(err) {
        return res.sendStatus(500);
      }
      else {
        return res.json(result);
      }
    });
  });
});

module.exports = router;
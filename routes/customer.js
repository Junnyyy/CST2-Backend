var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");


router.get("/", function (req, res, next) {
  const query ='SELECT Customer_ID, Customer_F_Name, Customer_M_Name, Customer_L_Name, Membership_Status, Customer_Username, Customer_Email FROM CUSTOMER;';
  database.query(query,function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result)
  });
});


router.post("/", function (req, res, next) {
  // Data validation
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.sendStatus(400);
  }

  const newCust = req.body;
  var data = [newCust.fname, newCust.mname, newCust.lname, newCust.status, newCust.user, newCust.password, newCust.email];

  const query =
    "INSERT INTO CUSTOMER(Customer_F_Name, Customer_M_Name, Customer_L_Name, Membership_Status, Customer_Username, Customer_Password, Customer_Email) VALUES(?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
  });
  const returnquery = "SELECT Customer_ID FROM CUSTOMER WHERE Customer_Email=?;";
  database.query(returnquery, newCust.email, function(err,result){
    if(err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result);
  });
});


router.delete("/", function(req, res, next) {
  if (Object.keys(req.body).length < 1) return res.status(400);

  const delCust = req.body;
  var data = [delCust.CID];

  const query = "DELETE FROM CUSTOMER WHERE Customer_ID =?;";
  database.query(query, [data], function(err,result) {
    if(err) {
      res.sendStatus(500);
      throw err;
    }
    res.sendStatus(200);
  });
});



module.exports = router;
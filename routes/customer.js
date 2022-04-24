var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");


router.get("/", function (req, res, next) {
  const query ='SELECT Customer_ID, Customer_F_Name, Customer_M_Name, Customer_L_Name, Membership_Status, Customer_Username, Customer_Email FROM CUSTOMER;';
  database.query(query,function (err, result) {
    if (err) {
      return res.sendStatus(500);
    }
    else {
      return res.status(200).json(result);
    }
  });
});

router.put("/", function (req, res, next) {
  if (req.body.constructor !== Object || Object.keys(req.body).length < 7) {
    return res.sendStatus(500);
  }
  const updateCust = req.body;
  const Uquery = "UPDATE CUSTOMER SET Customer_F_Name=?, Customer_M_Name=?, Customer_L_Name=?, Membership_Status=?, Customer_Username=?, Customer_Email=? WHERE Customer_ID=?;";
  database.query(
    Uquery,
    [
      updateCust.Customer_F_Name,
      updateCust.Customer_M_Name,
      updateCust.Customer_L_Name,
      updateCust.Membership_Status,
      updateCust.Customer_Username,
      updateCust.Customer_Email,
      updateCust.Customer_ID,
    ],
    function (err, result) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

router.post("/", function (req, res, next) {
  // Data validation
  if (req.body.constructor !== Object || Object.keys(req.body).length < 7) {
    return res.sendStatus(400);
  }

  const newCust = req.body;
  var data = [newCust.fname, newCust.mname, newCust.lname, newCust.status, newCust.user, newCust.password, newCust.email];

  const query =
    "INSERT INTO CUSTOMER(Customer_F_Name, Customer_M_Name, Customer_L_Name, Membership_Status, Customer_Username, Customer_Password, Customer_Email) VALUES(?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      return res.sendStatus(500);
    }
  });
  const returnquery = "SELECT Customer_ID FROM CUSTOMER WHERE Customer_Email=?;";
  database.query(returnquery, newCust.email, function(err,result){
    if(err) {
      return res.sendStatus(500);
    }
    else {
      return res.status(200).json(result);
    }
  });
});


router.delete("/", function(req, res, next) {
  if (req.body.constructor !== Object || Object.keys(req.body).length < 1) {
    return res.status(400).json({error: "Customer ID required."});
  }

  const delCust = req.body;
  var data = [delCust.Customer_ID];

  const query = "DELETE FROM CUSTOMER WHERE Customer_ID =?;";
  database.query(query, [data], function(err,result) {
    if(err) {
      return res.sendStatus(500);
    }
    else {
    res.sendStatus(200);
    }
  });
});



module.exports = router;
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

router.put("/", function (req, res, next) {
  const updateCust = req.body;
  // use primary key to find row to modify
  const Squery =
    "SELECT Customer_ID, Customer_F_Name, Customer_M_Name, Customer_L_Name, Membership_Status, Customer_Username, Customer_Password, Customer_Email FROM CUSTOMER WHERE Customer_ID=?;";
  database.query(Squery, updateCust.CID, function (err, results) {
    if (err) {
      //row doesn't exist
      res.sendStatus(404);
      throw err;
    }
    // creates an array that holds the key values that the query returned
    // primary key cannot be modified
    var CustPK = updateCust.CID;
    //if an attribute is not to be modified, then the original req will have that key assigned to a value that is an empty string
    //if an attribute is to be modified, then the original req will hold that value in the associated key
    if (updateCust.fname == "") {
      var newFname = results[0].Customer_F_Name;
    } else {
      var newFname = updateCust.fname;
    }
    if (updateCust.mname == "") {
      var newMname= results[0].Customer_M_Name;
    } else {
      var newMname = updateCust.mname;
    }
    if (updateCust.lname == "") {
      var newLname = results[0].Customer_L_Name;
    } else {
      var newLname = updateCust.lname;
    }
    if (updateCust.status == "") {
      var newStatus = results[0].Membership_Status;
    } else {
      var newStatus = updateCust.status;
    }
    if (updateCust.user == "") {
      var newUser = results[0].Customer_Username;
    } else {
      var newUser = updateCust.user;
    }
    if(updateCust.password=="") {
      var newPass =results[0].Customer_Password;
    }
    else {
      var newPass = updateCust.password;
    }
    if(updateCust.email=="") {
      var newEmail = results[0].Customer_Email;
    }
    else {
      var newEmail = updateCust.email;
    }
    const Uquery =
      "UPDATE CUSTOMER SET Customer_F_Name=?, Customer_M_Name=?, Customer_L_Name=?, Membership_Status=?, Customer_Username=?, Customer_Password=?, Customer_Email=? WHERE Customer_ID=?;";
    database.query(
      Uquery,
      [
        newFname,
        newMname,
        newLname,
        newStatus,
        newUser,
        newPass,
        newEmail,
        CustPK,
      ],
      function (err, result) {
        if (err) {
          throw err;
        }
      }
    );
  });
  res.sendStatus(200);
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
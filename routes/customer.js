var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");
router.get("/", function (req, res, next) {
  const query ='SELECT Customer_F_Name, Customer_M_Name, Customer_L_Name, Membership_Status FROM CUSTOMER;';
  database.query(query,function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result)
  });
});
//FIX CODE BELOW!!!!!!
/*router.patch("/", function(req, res, next) {
  const updateEx = req.body;
  // use primary key to find row to modify
  const Squery = "SELECT Exhibit_Name, Arrival_Date, Departure_Date, Permanent, Ticket_Price, Number_Tickets_Sold, Managing_Department FROM EXHIBIT WHERE Exhibit_ID=?;";
  database.query(Squery,updateEx.EID,function(err,results){
    if(err) {
      //row doesn't exist
      res.sendStatus(404);
      throw err;
    }
    // creates an array that holds the key values that the query returned
    var rs = Object.getOwnPropertyNames(results);
    var newData = [];
    // primary key cannot be modified
    var galPK = delGal.name;
    //if an attribute is not to be modified, then the original req will have that key assigned to a value that is an empty string
    //if an attribute is to be modified, then the original req will hold that value in the associated key
    if(delGal.manager=="") {
      var newManager =rs[1];
    }
    else {
      var newManager = delGal.manager;
    }
    if(delGal.capacity=="") {
      var newCapacity = rs[2];
    }
    else {
      var newCapacity = delGal.capacity;
    }
    const Uquery = "UPDATE GALLERY SET Managing_Department=?, Capacity=? WHERE Gallery_Name=?;";
    database.query(Uquery,[newManager, newCapacity, galPK], function(err,result){
      if(err) {
        throw err;
      }
    });
  });
  res.sendStatus(200);
});*/
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
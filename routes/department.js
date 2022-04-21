var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");


router.get("/", function (req, res, next) {
  const query ="SELECT * FROM DEPARTMENT;";
  database.query(query,function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result)
  })
});

router.put("/", function(req, res, next) {
  const updateDept = req.body;
  // use primary key to find row to modify
  const Squery = "SELECT Location, Supervisor_ID FROM DEPARTMENT WHERE Department_Name =?;";
  database.query(Squery,updateDept.name,function(err,results){
    if(err) {
      //row doesn't exist
      res.sendStatus(404);
      throw err;
    }
    // creates an array that holds the key values that the query returned
    // primary key cannot be modified
    var deptPK = updateDept.name;
    //if an attribute is not to be modified, then the original req will have that key assigned to a value that is an empty string
    //if an attribute is to be modified, then the original req will hold that value in the associated key
    if(updateDept.loc=="") {
      var newLoc =results[0].Location;
    }
    else {
      var newLoc = updateDept.loc;
    }
    if(updateDept.SID=="") {
      var newSupervisor = results[0].Supervisor_ID;
    }
    else {
      var newSupervisor = updateDept.SID;
    }
    const Uquery = "UPDATE DEPARTMENT SET Location=?, Supervisor_ID=? WHERE Department_Name=?;";
    database.query(Uquery,[newLoc, newSupervisor, deptPK], function(err,result){
      if(err) {
        throw err;
      }
    });
  });
  res.sendStatus(200);
});

router.post("/", function (req, res, next) {
  // Data validation
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.sendStatus(400);
  }

  const newDept = req.body;
  var data = [newDept.name, newDept.loc, newDept.SID];
  const query =
    "INSERT INTO DEPARTMENT (Department_Name, Location, Supervisor_ID) VALUES(?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
  });
  const returnquery = "SELECT Department_Name FROM DEPARTMENT WHERE Department_Name=?;";
  database.query(returnquery, newDept.name, function(err,result){
    if(err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result);
  });
});

router.delete("/", function(req, res, next) {
  if (Object.keys(req.body).length < 1) return res.status(400);

  const delDept = req.body;
  var data = [delDept.name];

  const query = "DELETE FROM DEPARTMENT WHERE Department_Name =?;";
  database.query(query, [data], function(err,result) {
    if(err) {
      res.sendStatus(500);
      throw err;
    }
    res.sendStatus(200);
  });
});
module.exports = router;

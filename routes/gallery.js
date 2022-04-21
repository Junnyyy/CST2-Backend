var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");
router.get("/", function (req, res, next) {
  const query ='SELECT * FROM GALLERY;';
  database.query(query,function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result);
  })
});

router.put("/", function(req, res, next) {
  const delGal = req.body;
  // use primary key to find row to modify
  const Squery = "SELECT Gallery_Name, Managing_Department, Capacity FROM GALLERY WHERE Gallery_Name=?;";
  database.query(Squery,delGal.name,function(err,results){
    if(err) {
      //row doesn't exist
      res.sendStatus(404);
      throw err;
    }
    // creates an array that holds the key values that the query returned
    // primary key cannot be modified
    var galPK = delGal.name;
    //if an attribute is not to be modified, then the original req will have that key assigned to a value that is an empty string
    //if an attribute is to be modified, then the original req will hold that value in the associated key
    if(delGal.manager=="") {
      var newManager =results[0].Managing_Department;
    }
    else {
      var newManager = delGal.manager;
    }
    if(delGal.capacity=="") {
      var newCapacity = results[0].Capacity;
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
});

router.post("/", function (req, res, next) {
  // Data validation
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.sendStatus(400);
  }

  const newGal = req.body;
  var data = [newGal.name, newGal.manager, newGal.capacity];
  const query =
    "INSERT INTO GALLERY(Gallery_Name, Managing_Department,Capacity) VALUES(?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
  });
  const returnquery = "SELECT Gallery_Name FROM GALLERY WHERE Gallery_Name=?;";
  database.query(returnquery, newGal.name, function(err,result){
    if(err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result);
  });
});
router.delete("/", function(req, res, next) {
  if (Object.keys(req.body).length < 1) return res.status(400);

  const delGal = req.body;
  var data = [delGal.name];

  const query = "DELETE FROM GALLERY WHERE Gallery_Name =?;";
  database.query(query, [data], function(err,result) {
    if(err) {
      res.sendStatus(500);
      throw err;
    }
    res.sendStatus(200);
  });
});
module.exports = router;
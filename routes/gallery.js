var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");


router.get("/", function (req, res, next) {
  const query ='SELECT * FROM GALLERY;';
  database.query(query,function (err, result) {
    if (err) {
      return res.sendStatus(500);
    }
    return res.status(200).json(result);
  })
});


router.post("/", function (req, res, next) {
  // Data validation
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.sendStatus(500);
  }

  const newGal = req.body;
  var data = [newGal.name, newGal.manager, newGal.capacity];
  const query =
    "INSERT INTO GALLERY(Gallery_Name, Managing_Department,Capacity) VALUES(?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      return res.sendStatus(500);
    }
  });
  const returnquery = "SELECT Gallery_Name FROM GALLERY WHERE Gallery_Name=?;";
  database.query(returnquery, newGal.name, function(err,result){
    if(err) {
      return res.sendStatus(500);
    }
    else {
      return res.status(200).json(result);
    }
  });
  return;
});
router.delete("/", function(req, res, next) {
  if (req.body.constructor !== Object || Object.keys(req.body).length < 1) {
    return res.sendStatus(500);
  }

  const delGal = req.body;
  var data = [delGal.name];

  const query = "DELETE FROM GALLERY WHERE Gallery_Name =?;";
  database.query(query, [data], function(err,result) {
    if(err) {
      return res.sendStatus(500);
    }
    else {
      return res.sendStatus(200);
    }
  });
  return;
});
module.exports = router;
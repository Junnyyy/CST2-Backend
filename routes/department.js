var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");


router.get("/", function (req, res, next) {
  const query ="SELECT * FROM DEPARTMENT;";
  database.query(query,function (err, result) {
    if (err) {
      return res.sendStatus(500);
    }
    else {
      return res.status(200).json(result)
    }
  })
});

router.put("/", function(req, res, next) {
  if (req.body.constructor !== Object || Object.keys(req.body).length < 3) {
    return res.sendStatus(500);
  }
  const updateDept = req.body;
    const Uquery = "UPDATE DEPARTMENT SET Location=?, Supervisor_ID=? WHERE Department_Name=?;";
    database.query(Uquery,[updateDept.Location, updateDept.Supervisor_ID, updateDept.Department_Name], function(err,result){
      if(err) {
        return res.sendStatus(500);
      }
      else {
        return res.sendStatus(200);
      }
    });
  });

router.post("/", function (req, res, next) {
  // Data validation
  if (req.body.constructor !== Object || Object.keys(req.body).length < 3) {
    return res.sendStatus(500);
  }

  const newDept = req.body;
  var data = [newDept.name, newDept.loc, newDept.SID];
  const query =
    "INSERT INTO DEPARTMENT (Department_Name, Location, Supervisor_ID) VALUES(?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      return res.sendStatus(500);
    }
  });
  const returnquery = "SELECT Department_Name FROM DEPARTMENT WHERE Department_Name=?;";
  database.query(returnquery, newDept.name, function(err,result){
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
    return res.sendStatus(500);
  }

  const delDept = req.body;
  var data = [delDept.Department_Name];

  const query = "DELETE FROM DEPARTMENT WHERE Department_Name =?;";
  database.query(query, [data], function(err,result) {
    if(err) {
      return res.sendStatus(500);
    }
    else {
      return res.sendStatus(200);
    }
  });
});
module.exports = router;

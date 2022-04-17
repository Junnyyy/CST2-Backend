var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");
router.get("/", function (req, res, next) {
  const query ='SELECT Department_Name, Location FROM DEPARTMENT;';
  database.query(query,function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result)
  })
});

router.post("/", function (req, res, next) {
  // Data validation
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.sendStatus(400);
  }

  const newDept = req.body;
  var data = [newDept.name, newDept.loc, newDept.SID];
  const query =
    "INSERT INTO DEPARTMENT(Department_Name, Location, Supervisor_ID) VALUES(?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.sendStatus(200);
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

var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");
router.get("/", function (req, res, next) {
  const query ='SELECT Employee_F_Name, Employee_M_Name, Employee_L_Name, Department_Name FROM EMPLOYEE;';
  database.query(query,function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result)
  })
});
router.delete("/", function(req, res, next) {
  if (Object.keys(req.body).length < 1) return res.status(400);

  const delEmployee = req.body;
  var data = [delEmployee.EID];

  const query = "DELETE FROM EMPLOYEE WHERE Employee_ID =?;";
  database.query(query, [data], function(err,result) {
    if(err) {
      res.sendStatus(500);
      throw err;
    }
    res.sendStatus(200);
  });
});
module.exports = router;
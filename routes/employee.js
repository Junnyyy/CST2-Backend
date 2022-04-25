var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");


router.get("/", function (req, res, next) {
  const query ='SELECT Employee_ID, Employee_F_Name, Employee_M_Name, Employee_L_Name, Department_Name, Employee_Salary, Employee_DOB, Employee_Email, Employee_Username FROM EMPLOYEE;';
  database.query(query,function (err, result) {
    if (err) {
      return res.sendStatus(500);
    }
    return res.json(result)
  });
});

router.put("/", function (req, res, next) {
  if (req.body.constructor !== Object || Object.keys(req.body).length < 9) {
    res.sendStatus(400);
  }
  const updateEmployee = req.body;
  const Uquery = "UPDATE EMPLOYEE SET Employee_F_Name=?, Employee_M_Name=?, Employee_L_Name=?, Department_Name=?, Employee_Salary=?, Employee_DOB=?, Employee_Username=?, Admin_Flag=? WHERE Employee_ID=?;";
  database.query(
    Uquery,
    [ 
      updateEmployee.fname,
      updateEmployee.mname,
      updateEmployee.lname,
      updateEmployee.department,
      updateEmployee.salary,
      updateEmployee.dob,
      updateEmployee.user,
      updateEmployee.flag,
      updateEmployee.EID,
    ],
    function (err, result) {
      if (err) {
        return res.status(404).json({error: err.sqlMessage});
      } else if(result.affectedRows==0){
        return res.status(500);
      }
      else {
        return res.sendStatus(200);
      }
    }
  );
});


router.delete("/", function(req, res, next) {
  if (req.body.constructor !== Object || Object.keys(req.body).length < 1) {
    res.sendStatus(400);
  }

  const delEmployee = req.body;
  var data = [delEmployee.EID];

  const query = "DELETE FROM EMPLOYEE WHERE Employee_ID =?;";
  database.query(query, [data], function(err,result) {
    if (err) {
      return res.sendStatus(500);
    }else {
      return res.sendStatus(200);
    }
    res.sendStatus(200);
  });
  return;
});
module.exports = router;
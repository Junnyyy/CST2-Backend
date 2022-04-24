var express = require("express");
const res = require("express/lib/response");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");
var encryption = require("../helpers/encryption");


router.get("/", function (req, res, next) {
  const query ='SELECT Employee_ID, Employee_F_Name, Employee_M_Name, Employee_L_Name, Department_Name, Employee_Salary, Employee_DOB, Employee_Email, Employee_Username, Admin_Flag FROM EMPLOYEE;';
  database.query(query,function (err, result) {
    if (err) {
      res.sendStatus(500);
    }
    res.json(result)
  });
});

router.put("/", async (req, res, next) => {
  if (req.body.constructor !== Object || Object.keys(req.body).length < 8) {
    return res.sendStatus(400);
  }
  else {
    next();
  }
}, (req, res, next) => {
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
        return res.sendStatus(500);
      } else {
        next();
      }
    }
    );
}, (req, res) => {
  res.sendStatus(200);
  return;
});


router.delete("/", function(req, res, next) {
  const reqID = req.user.id;
  const reqAdmin = req.user.admin;

  if(!reqAdmin) {
    if (reqID!=req.body.EmployeeID) {
      return res.status(404).json({error: "You are not authorized to delete other Employees!"})
    }
  }
  if (req.body.constructor !== Object || Object.keys(req.body).length < 1) {
    return res.sendStatus(500);
  }
  const delEmployee = req.body;
  var data = [delEmployee.EmployeeID];

  const query = "DELETE FROM EMPLOYEE WHERE Employee_ID =?;";
  database.query(query, [data], function(err,result) {
    if(err) {
      res.sendStatus(500);
      throw err;
    } else {
    res.sendStatus(200);
    }
  });
});
module.exports = router;
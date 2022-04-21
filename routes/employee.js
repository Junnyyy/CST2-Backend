var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");
router.get("/", function (req, res, next) {
  const query ='SELECT Employee_ID, Employee_F_Name, Employee_M_Name, Employee_L_Name, Department_Name FROM EMPLOYEE;';
  database.query(query,function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result)
  })
});

router.put("/", function (req, res, next) {
  const updateEmployee = req.body;
  // use primary key to find row to modify
  const Squery =
    "SELECT Employee_F_Name, Employee_M_Name, Employee_L_Name, Department_Name, Employee_Salary, Employee_DOB, Employee_Email, Employee_Username, Employee_Password, Admin_Flag FROM EMPLOYEE WHERE Employee_ID=?;";
  database.query(Squery, updateEmployee.EID, function (err, results) {
    if (err) {
      //row doesn't exist
      res.sendStatus(404);
      throw err;
    }
    // creates an array that holds the key values that the query returned
    // primary key cannot be modified
    var EmployeePK = updateEmployee.EID;
    //if an attribute is not to be modified, then the original req will have that key assigned to a value that is an empty string
    //if an attribute is to be modified, then the original req will hold that value in the associated key
    if (updateEmployee.fname == "") {
      var newFname = results[0].Employee_F_Name;
    } else {
      var newFname = updateEmployee.fname;
    }
    if (updateEmployee.mname == "") {
      var newMname= results[0].Employee_M_Name;
    } else {
      var newMname = updateEmployee.mname;
    }
    if (updateEmployee.lname == "") {
      var newLname = results[0].Employee_L_Name;
    } else {
      var newLname = updateEmployee.lname;
    }
    if (updateEmployee.department == "") {
      var newDept = results[0].Department_Name;
    } else {
      var newDept = updateEmployee.department;
    }
    if(updateEmployee.salary=="") {
      var newSalary = results[0].Employee_Salary;
    }
    else {
      var newSalary = updateEmployee.salary;
    }
    if(updateEmployee.dob=="") {
      var newDOB = results[0].Employee_DOB;
    }
    else {
      var newDOB = updateEmployee.dob;
    }
    if(updateEmployee.email=="") {
      var newEmail = results[0].Employee_Email;
    }
    else {
      var newEmail = updateEmployee.email;
    }
    if (updateEmployee.user == "") {
      var newUser = results[0].Employee_Username;
    } else {
      var newUser = updateEmployee.user;
    }
    if(updateEmployee.password=="") {
      var newPass =results[0].Employee_Password;
    }
    else {
      var newPass = updateEmployee.password;
    }
    if(updateEmployee.flag=="") {
      var newFlag = results[0].Admin_Flag;
    }
    else {
      var newFlag = updateEmployee.flag;
    }
    const Uquery =
      "UPDATE EMPLOYEE SET Employee_F_Name=?, Employee_M_Name=?, Employee_L_Name=?, Department_Name=?, Employee_Salary=?, Employee_DOB=?, Employee_Email=?, Employee_Username=?, Employee_Password=?, Admin_Flag=? WHERE Employee_ID=?;";
    database.query(
      Uquery,
      [
        newFname,
        newMname,
        newLname,
        newDept,
        newSalary,
        newDOB,
        newEmail,
        newUser,
        newPass,
        newFlag,
        EmployeePK
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

  const newEmp = req.body;
  var data = [newEmp.fname, newEmp.mname, newEmp.lname, newEmp.department, newEmp.salary, newEmp.dob, newEmp.user, newEmp.password];

  const query =
    "INSERT INTO EMPLOYEE (Employee_F_Name, Employee__M_Name, Employee_L_Name, Department_Name, Employee_Salary, Employee_DOB, Employee_Username, Employee_Password) VALUES (?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
  });
  const returnquery = "SELECT Employee_ID FROM EMPLOYEE WHERE Employee_Email=?;";
  database.query(returnquery, newEmp.email, function(err,result){
    if(err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result);
  });
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
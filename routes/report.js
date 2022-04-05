var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../database.js");

// Return all data
router.get("/", function (req, res, next) {
  const query =
    "SELECT Employee_F_Name, Employee_M_Name, Employee_L_Name FROM EMPLOYEE;" +
    " SELECT Art_Piece_Title FROM ART_PIECE";
  database.query(query, [], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json([result[0], result[1]]);
    //console.log(JSON.parse());
    //res.json(result[0].concat(result[1]));
  });

  /*employeeData1 = getEmployee();
  employeeData2 = getEmployee();
  employeeData3 = JSON.stringify(employeeData1.concat(employeeData2));
  console.log(employeeData3);*/
  //res.json(JSON.parse(employeeData1));
});

module.exports = router;

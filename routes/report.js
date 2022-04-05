var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");

// Return all data
router.get("/", function (req, res, next) {
  const query =
    "SELECT Employee_F_Name, Employee_M_Name, Employee_L_Name FROM EMPLOYEE;" +
    " SELECT Art_Piece_Title FROM ART_PIECE;" +
    " SELECT Customer_F_Name, Customer_M_Name, Customer_L_Name FROM CUSTOMER;" +
    " SELECT Department_Name, Location FROM DEPARTMENT;" +
    " SELECT Exhibit_Name, Ticket_Price FROM EXHIBIT;" +
    " SELECT Gallery_Name FROM GALLERY;" +
    " SELECT Item_Name FROM STORE_ITEM;"; // add new index by concat(+) a string
  database.query(query, [], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json([
      result[0],
      result[1],
      result[2],
      result[3],
      result[4],
      result[5],
      result[6],
    ]); // Each query is a new index
  });
});

module.exports = router;

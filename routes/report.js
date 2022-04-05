var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");

// Return all data
router.get("/", function (req, res, next) {
  const query =
    "SELECT Employee_F_Name, Employee_M_Name, Employee_L_Name FROM EMPLOYEE;" +
    " SELECT Art_Piece_Title, Creator_F_Name, Creator_L_Name FROM ART_PIECE;" +
    " SELECT Customer_F_Name, Customer_M_Name, Customer_L_Name FROM CUSTOMER;" +
    " SELECT Department_Name, Location FROM DEPARTMENT;" +
    " SELECT Exhibit_Name, Ticket_Price FROM EXHIBIT;" +
    " SELECT Gallery_Name FROM GALLERY;" +
    " SELECT Item_Name FROM STORE_ITEM;";
  database.query(query, [], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    // Each array is an index
    res.json([
      result[0], // Employee
      result[1], // Art pieces
      result[2], // Customer
      result[3], // Department
      result[4], // Exhibit
      result[5], // Gallery
      result[6], // Store items
    ]);
  });
});

module.exports = router;

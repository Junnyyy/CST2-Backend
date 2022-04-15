var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");
router.get("/", function (req, res, next) {
  const query ='SELECT Item_Name, Item_Price, Quantity_In_Stock, Number_Sold FROM STORE_ITEM;';
  database.query(query,function (err, result) {
    if (err) {
      req.sendStatus(500);
      throw err;
    }
    res.json(result)
  })
  });
module.exports = router;
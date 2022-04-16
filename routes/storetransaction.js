var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");
router.get("/", function (req, res, next) {
  const query ='SELECT Store_Transaction_ID, Store_Customer_ID,Store_Total_Bill,Store_Item_ID,Store_Transaction_Date FROM STORE_TRANSACTION;';
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

  const newStoreTran = req.body;
  var data = [newStoreTran.CID,newStoreTran.total,newStoreTran.IID];

  const query = "INSERT INTO store_transaction(Store_Customer_ID,Store_Total_Bill,Store_Item_ID,Store_Transaction_Date) VALUES(?,CURDATE());";
  database.query(query, [data], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.sendStatus(200);
  });
});

module.exports = router;
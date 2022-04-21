var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");


router.get("/", function (req, res, next) {
  const query ='SELECT * FROM STORE_TRANSACTION;';
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
  var data = [newStoreTran.CID,newStoreTran.IID];

  const query = "INSERT INTO store_transaction(Store_Customer_ID,Store_Item_ID) VALUES(?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
  });

  
  const returnquery = "SELECT Store_Transaction_ID FROM STORE_TRANSACTION WHERE Store_Customer_ID=? AND Store_Item_ID=? AND Store_Transaction_Date=CURDATE();";
  database.query(returnquery, [newStoreTran.CID, newStoreTran.IID], function(err,result){
    if(err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result);
  });
});

module.exports = router;
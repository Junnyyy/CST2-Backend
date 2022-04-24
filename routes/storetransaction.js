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

router.put("/", function (req, res, next) {
  if (req.body.constructor !== Object || Object.keys(req.body).length < 4) {
    return res.sendStatus(500);
  }
  const updateST = req.body;
  // use primary key to find row to modify

  const Uquery =
  "UPDATE STORE_TRANSACTION SET Store_Customer_ID=?, Store_Item_ID=?, Store_Total_Bill=?, Store_Transaction_Date=? WHERE Store_Transaction_ID=?;";
  database.query(
    Uquery,
    [
      updateST.Store_Customer_ID,
      updateST.Store_Item_ID,
      updateST.Store_Total_Bill,
      updateST.Store_Transaction_Date,
      updateST.Store_Transaction_ID
    ],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      else {
        return res.sendStatus(200);
      }
    }
  );
});

router.post("/", function (req, res, next) {
  // Data validation
  if (req.body.constructor !== Object || Object.keys(req.body).length < 2) {
    return res.sendStatus(500);
  }

  const newStoreTran = req.body;
  var data = [newStoreTran.CID,newStoreTran.IID];

  const query = "INSERT INTO store_transaction(Store_Customer_ID,Store_Item_ID) VALUES(?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      return res.sendStatus(500);
    }
  });
  
  const returnquery = "SELECT Store_Transaction_ID FROM STORE_TRANSACTION WHERE Store_Customer_ID=? AND Store_Item_ID=? AND Store_Transaction_Date=CURDATE();";
  database.query(returnquery, [newStoreTran.CID, newStoreTran.IID], function(err,result){
    if(err) {
      return res.sendStatus(500);
    }
    else {
      return res.json(result);
    }
  });
});

module.exports = router;
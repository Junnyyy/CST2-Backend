var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");


router.get("/", function (req, res, next) {
  const query ='SELECT * FROM STORE_ITEM;';
  database.query(query,function (err, result) {
    if (err) {
      return res.sendStatus(500);
    }
    return res.json(result);
  });
});

router.post("/", function (req, res, next) {
  if (req.body.constructor !== Object || Object.keys(req.body).length < 1) {
    return res.sendStatus(500);
  }
  const newItem = req.body;
  var data = [newItem.item, newItem.quantity, newItem.price];

  const query = "INSERT INTO STORE_ITEM(Item_Name, Quantity_In_Stock, Item_Price) VALUES(?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      return res.status(500);;
    }
    else {
      next();
    }
  });
  const returnquery = "SELECT Item_ID FROM STORE_ITEM WHERE Item_Name=?;";
  database.query(returnquery, newItem.item, function(err,result){
    if(err) {
      return res.sendStatus(500);
    }
    else {
      return res.status(200).json(result);
    }
  });
  return;
});

router.delete("/", function(req, res, next) {
  if (req.body.constructor !== Object || Object.keys(req.body).length < 1) {
    return res.sendStatus(500);
  }

  const delItem = req.body;
  var data = [delItem.itemID];

  const query = "DELETE FROM STORE_ITEM WHERE Item_ID =?;";
  database.query(query, [data], function(err,result) {
    if(err) {
      return res.sendStatus(500);
    }
    else {
      return res.sendStatus(200);
    }
  });
  return;
});

module.exports = router;
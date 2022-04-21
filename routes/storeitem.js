var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");


router.get("/", function (req, res, next) {
  const query ='SELECT * FROM STORE_ITEM;';
  database.query(query,function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result)
  })
});

router.put("/", function (req, res, next) {
  const updateItem = req.body;
  // use primary key to find row to modify
  const Squery =
    "SELECT Item_Name, Quantity_In_Stock, Item_Price, Number_Sold FROM STORE_ITEM WHERE Item_ID=?;";
  database.query(Squery, updateItem.IID, function (err, results) {
    if (err) {
      //row doesn't exist
      res.sendStatus(404);
      throw err;
    }
    // creates an array that holds the key values that the query returned
    // primary key cannot be modified
    var ItemPK = updateItem.IID;
    //if an attribute is not to be modified, then the original req will have that key assigned to a value that is an empty string
    //if an attribute is to be modified, then the original req will hold that value in the associated key
    if (updateItem.item == "") {
      var newName = results[0].Item_Name;
    } else {
      var newName = updateItem.item;
    }
    if (updateItem.quantity == "") {
      var newQuantity = results[0].Quantity_In_Stock;
    } else {
      var newQuantity = updateItem.quantity;
    }
    if (updateItem.price == "") {
      var newPrice = results[0].Item_Price;
    } else {
      var newPrice = updateItem.price;
    }
    if (updateItem.sold == "") {
      var newSold = results[0].Number_Sold;
    } else {
      var newSold = updateItem.sold;
    }
    const Uquery =
      "UPDATE STORE_ITEM SET Item_Name=?, Quantity_In_Stock=?, Item_Price=?, Number_Sold=? WHERE Item_ID=?;";
    database.query(
      Uquery,
      [
        newName,
        newQuantity,
        newPrice,
        newSold,
        ItemPK,
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

  const newItem = req.body;
  var data = [newItem.item, newItem.quantity, newItem.price];

  const query = "INSERT INTO STORE_ITEM(Item_Name, Quantity_In_Stock, Item_Price) VALUES(?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
  });
  const returnquery = "SELECT Item_ID FROM STORE_ITEM WHERE Item_Name=?;";
  database.query(returnquery, newItem.item, function(err,result){
    if(err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result);
  });
});

router.delete("/", function(req, res, next) {
  if (Object.keys(req.body).length < 1) return res.status(400);

  const delItem = req.body;
  var data = [delItem.itemID];

  const query = "DELETE FROM STORE_ITEM WHERE Item_ID =?;";
  database.query(query, [data], function(err,result) {
    if(err) {
      res.sendStatus(500);
      throw err;
    }
    res.sendStatus(200);
  });
});

module.exports = router;
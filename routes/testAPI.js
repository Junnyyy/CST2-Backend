var express = require("express");
var router = express.Router();
router.use(express.json());
//var database = require('./database.js');

emails = [ // Example email data set
  { email: "bobbie@gmail.com" },
  { email: "josh@gmail.com" },
  { email: "data@github.com" },
];

router.get("/", function (req, res, next) { 
  res.json(emails); // Returns json emails on GET request
});

router.post("/", function (req, res, next) {
  const { email } = req.body; // Save request data
  var emailTemp = { email: email }; // Create temporary variable
  emails.push(emailTemp) // Add to dataset

  res.sendStatus(200) // all good status
});
module.exports = router;

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

// routers
const indexRouter = require("./routes/index");
//const testAPIRouter = require('./routes/testAPI');
const artpieceRouter = require("./routes/artpiece");
const reportRouter = require("./routes/report");
const authRouter = require("./routes/auth");

// middleware
const authenticate = require("./middleware/authenticate.js");

var app = express();
app.use(cors());
app.use(authenticate);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
//app.use('/testAPI', testAPIRouter);
app.use("/artpiece", artpieceRouter);
app.use("/report", reportRouter);
app.use("/public", express.static("public"));
app.use("/auth", authRouter);

// catch favicon request
app.get("/favicon.ico", (req, res) => res.status(204));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

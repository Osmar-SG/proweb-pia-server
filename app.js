const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const routes = require("./routes/index");
const indexRouter = require("./routes/index");
const cors = require("cors");
const axios = require("axios");
const session = require("express-session");

const app = express();

require("./db");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "@motita69",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: false,
      secure: false,
    },
  })
);
app.use(express.static(path.join(__dirname, "public")));

//configuramos una carpeta de archivos estáticos
app.use("/javascripts", express.static(__dirname + "node_modules/axios/dist"));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE, OPTIONS",
    credentials: true,
  })
);

app.use("/", routes); //creamos el middleware de las rutas para tener acceso a ellas y poder modularizar

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

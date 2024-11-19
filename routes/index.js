const { Router } = require("express");
const router = Router();
const users = require("./users");
const ventas = require("./ventas");
const corteCajas = require("./corteCajas");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/usuario", users);
router.use("/ventas", ventas);
router.use("/corteCaja", corteCajas);

module.exports = router;

const { Router } = require("express");
const router = Router();
const users = require("./users");
const ventas = require("./ventas");
const corteCajas = require("./corteCajas");
const categoriaProducto = require("./categoriaProducto");

// Crea una función que sea el middleware para verificar la autentificación
const isAuthenticated = (req, res, next) => {
  console.log("req.session", req.session);
  if (req.session.isLoggedIn) {
    return next();
  }
  res.redirect("/");
};

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/principal", isAuthenticated, (req, res) => {
  res.render("principal");
});

router.use("/usuario", users);
router.use("/ventas", ventas);
router.use("/corteCaja", corteCajas);
router.use("/categoriaProducto", categoriaProducto);

module.exports = router;

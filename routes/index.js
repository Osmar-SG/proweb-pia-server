const { Router } = require("express");
const router = Router();
const users = require("./users");
const ventas = require("./ventas");
const corteCajas = require("./corteCajas");
const categoriaProducto = require("./categoriaProducto");
const productos = require("./productos");
const detalleVenta = require("./detalleVentas");

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

router.get("/historialventa", isAuthenticated, (req, res) => {
  res.render("historialventa");
});

router.get("/detalleventa", isAuthenticated, (req, res) => {
  res.render("detalleventa");
});

router.get("/iniciarventa", isAuthenticated, (req, res) => {
  res.render("iniciarventa");
});

router.get("/usuarios", isAuthenticated, (req, res) => {
  res.render("usuarios");
});

router.get("/productos", isAuthenticated, (req, res) => {
  res.render("productos");
});

router.get("/categorias", isAuthenticated, (req, res) => {
  res.render("categorias");
});

router.get("/politicas", isAuthenticated, (req, res) => {
  res.render("politicas");
});

router.get("/quiensomos", (req, res) => {
  res.render("quiensomos");
});

router.get("/reporteventa", isAuthenticated, (req, res) => {
  res.render("reporteventa");
});

router.get("/politicas", (req, res) => {
  res.render("politicas");
});

router.get("/reporteventas", isAuthenticated, (req, res) => {
  res.render("reporteventas");
});

router.get("/historialcortecaja", isAuthenticated, (req, res) => {
  res.render("historialcortecaja");
});

router.get("/cortecaja", (req, res) => {
  res.render("iniciarCerrarJornada");
});


router.get("/registro", (req, res) => res.render("registro"));

/*No tocar*/
router.use("/usuario", users);
router.use("/ventas", ventas);
router.use("/corteCaja", corteCajas);
router.use("/categoriaProducto", categoriaProducto);
router.use("/productos", productos);
router.use("/detalleVentas", detalleVenta);

module.exports = router;

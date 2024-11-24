const { Router } = require("express");
const router = Router();
const ventasFunctions = require("../controllers/ventas");

//GET Methods
router.get("/", ventasFunctions.obtenerVentas);
router.get("/:id", ventasFunctions.obtenerVentasById);
//POST Methods
router.post("/:userId", ventasFunctions.crearVenta);
//PUT Methods
//DELETE Methods

module.exports = router;

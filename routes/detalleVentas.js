const { Router } = require("express");
const router = Router();
const detalleVentasFunctions = require("../controllers/detalleVentas");

router.get("/", detalleVentasFunctions.obtenerVentaDetalles);

router.post("/", detalleVentasFunctions.crearDetalleVenta);

module.exports = router;

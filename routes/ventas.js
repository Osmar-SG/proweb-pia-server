const { Router } = require("express");
const router = Router();
const ventasFunctions = require("../controllers/ventas");

//GET Methods
//POST Methods
router.post("/:userId", ventasFunctions.crearVenta);
//PUT Methods
//DELETE Methods

module.exports = router;

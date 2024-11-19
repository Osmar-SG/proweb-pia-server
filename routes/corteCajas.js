const { Router } = require("express");
const router = Router();
const corteCajasFunctions = require("../controllers/corteCaja");

//GET Methods
//POST Methods
router.post("/:userId", corteCajasFunctions.crearCorteCaja);
//PUT Methods
//DELETE Methods

module.exports = router;

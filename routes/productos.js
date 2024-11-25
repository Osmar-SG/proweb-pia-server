const { Router } = require("express");
const router = Router();
const productoFunctions = require("../controllers/productos");

//GET Methods
router.get("/obtenerTodos", productoFunctions.obtenerTodosProductos);
router.get("/:id", productoFunctions.obtenerProductoById);
//POST Methods
//PUT Methods
//DELETE Methods

module.exports = router;

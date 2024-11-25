const { Router } = require("express");
const router = Router();
const productoFunctions = require("../controllers/productos");

//GET Methods
router.get("/obtenerTodos", productoFunctions.obtenerTodosProductos);
router.get("/:id", productoFunctions.obtenerProductoById);
router.get(
  "/categoria/:categoryId",
  productoFunctions.obtenerProductoPorCategoriaId
);
//POST Methods
router.post("/busqueda", productoFunctions.buscarProductoNombreCodigo);
//PUT Methods
//DELETE Methods

module.exports = router;

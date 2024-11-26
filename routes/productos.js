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
router.post("/crear", productoFunctions.crearProducto);
//PUT Methods
router.put("/editar/:id", productoFunctions.editarProducto);
//DELETE Methods
router.delete("/borrar/:id", productoFunctions.eliminarProducto);

module.exports = router;

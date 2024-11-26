const { Router } = require("express");
const router = Router();
const categoriaFunctions = require("../controllers/categoriaProducto");

//GET Methods
router.get("/obtenerTodos", categoriaFunctions.getAllCategories);
//POST Methods
router.post("/buscar/nombre", categoriaFunctions.buscarCategoriasPorNombre);
router.post("/crear", categoriaFunctions.crearCategoria);
//PUT Methods
router.put("/editar/:id", categoriaFunctions.editarCategoria);
//DELETE Methods
router.delete("/eliminar/:id", categoriaFunctions.borrarCategoria);

module.exports = router;

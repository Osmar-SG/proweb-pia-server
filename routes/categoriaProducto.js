const { Router } = require("express");
const router = Router();
const categoriaFunctions = require("../controllers/categoriaProducto");

//GET Methods
router.get("/obtenerTodos", categoriaFunctions.getAllCategories);
//POST Methods
router.post("/buscar/nombre", categoriaFunctions.buscarCategoriasPorNombre);
//PUT Methods
//DELETE Methods

module.exports = router;

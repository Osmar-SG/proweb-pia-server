const { Router } = require("express");
const router = Router();
const categoriaFunctions = require("../controllers/categoriaProducto");

//GET Methods
router.get("/obtenerTodos", categoriaFunctions.getAllCategories);
//POST Methods
<<<<<<< HEAD
router.post("/buscar/nombre", categoriaFunctions.buscarCategoriasPorNombre);
=======
router.post("/crear", categoriaFunctions.crearCategoria);
>>>>>>> cbc2a39bbf2d7cb8376b54fa62e876b67e7165d8
//PUT Methods
router.put("/editar/:id", categoriaFunctions.editarCategoria);
//DELETE Methods
router.delete("/eliminar/:id", categoriaFunctions.borrarCategoria);

module.exports = router;

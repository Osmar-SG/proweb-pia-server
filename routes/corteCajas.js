const { Router } = require("express");
const router = Router();
const corteCajasFunctions = require("../controllers/corteCaja");

//GET Methods
router.get("/obtenerTodos", corteCajasFunctions.obtenerTodosCorteCaja); //obtenemos todos los cortes de caja
router.get("/:id", corteCajasFunctions.obtenerCorteCajaById); // buscamos el corte de caja por su id
router.get("/usuario/:userId", corteCajasFunctions.obtenerCortePorUserId); //buscamos todos los cortes de caja por el id de usuario
//POST Methods
router.post("/:userId", corteCajasFunctions.crearCorteCaja)
//PUT Methods
//DELETE Methods

module.exports = router;

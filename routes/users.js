const { Router } = require("express");
const router = Router();
const usersFunctions = require("../controllers/users");

//GET Methods
router.get("/", usersFunctions.getUsers);
//POST Methods
router.post("/", usersFunctions.createUser);
//PUT Methods
//DELETE Methods

module.exports = router;

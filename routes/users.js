const { Router } = require("express");
const router = Router();
const usersFunctions = require("../controllers/users");

//GET Methods
router.get("/", usersFunctions.getUsers);
router.get("/:id", usersFunctions.getUserById);

//POST Methods
router.post("/", usersFunctions.createUser);
router.post("/login", usersFunctions.login);
router.post("/logout", usersFunctions.logout);
//PUT Methods

//DELETE Methods

module.exports = router;

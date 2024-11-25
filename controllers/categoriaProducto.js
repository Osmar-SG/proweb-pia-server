const { CategoriaProducto } = require("../db");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await CategoriaProducto.findAll();
      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

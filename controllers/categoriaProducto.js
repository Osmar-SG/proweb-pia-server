const { CategoriaProducto } = require("../db");
const { Op } = require("sequelize");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await CategoriaProducto.findAll();
      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  buscarCategoriasPorNombre: async (req, res) => {
    const { nombre } = req.body;
    try {
      const categoria = await CategoriaProducto.findAll({
        where: { [Op.or]: [{ nombre }] },
      });
      res.status(200).json(categoria);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

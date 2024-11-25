const { Producto, CategoriaProducto } = require("../db");
const { Op } = require("sequelize");

module.exports = {
  obtenerTodosProductos: async (req, res) => {
    try {
      const productos = await Producto.findAll({
        include: [{ model: CategoriaProducto }],
      });
      res.status(200).json(productos);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  obtenerProductoById: async (req, res) => {
    const { id } = req.params;
    try {
      const producto = await Producto.findOne({
        where: { id },
        include: [{ model: CategoriaProducto }],
      });
      res.status(200).json(producto);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  obtenerProductoPorCategoriaId: async (req, res) => {
    const { categoryId } = req.params;
    try {
      const productos = await Producto.findAll({
        where: { categoriaProductoId: categoryId },
      });
      res.status(200).json(productos);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  buscarProductoNombreCodigo: async (req, res) => {
    const { nombre, codigo } = req.body;
    try {
      const producto = await Producto.findAll({
        where: { [Op.or]: [{ nombre }, { codigo }] },
      });
      res.status(200).json(producto);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

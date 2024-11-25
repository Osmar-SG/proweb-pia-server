const { Producto, CategoriaProducto } = require("../db");

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
};

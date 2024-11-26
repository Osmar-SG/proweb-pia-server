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
  crearProducto: async (req, res) => {
    const {
      nombre,
      descripcion,
      precio,
      existencia,
      status,
      codigo,
      categoriaProductoId,
    } = req.body;
    try {
      const producto = await Producto.create({
        nombre,
        descripcion,
        precio,
        existencia,
        status,
        codigo,
      });
      const categoria = await CategoriaProducto.findOne({
        where: { id: categoriaProductoId },
      });
      await categoria.addProductos(producto);
      res.status(200).json(producto);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  eliminarProducto: async (req, res) => {
    const { id } = req.params;
    try {
      await Producto.destroy({ where: { id } });
      res.status(200).json({ message: "Producto borrado con éxito" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  editarProducto: async (req, res) => {
    const { nombre, descripcion, precio, existencia, status, codigo } =
      req.body;
    const { id } = req.params;
    try {
      const producto = await Producto.update(
        { nombre, descripcion, precio, existencia, status, codigo },
        { where: { id } }
      );
      res.status(200).json(producto);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
